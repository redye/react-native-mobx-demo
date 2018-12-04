## MobX 在 React-Native 中的应用

MobX 是一个经过战火洗礼的库，它通过透明的函数响应式编程(transparently applying functional reactive programming - TFRP)使得状态管理变得简单和可扩展。<br />
[MobX中文文档](https://cn.mobx.js.org/)

### MobX 安装
在 react-native 中使用 MobX，首先：

1. 安装 MobX：在 package.json 的 dependencies 中


		"mobx": "^4.2.1",
    	"mobx-react": "^5.1.2",
  
  或者在当前目录下 
  		
  		npm install mobx --save
  		npm install mobx-react --save

2. 安装 babel插件，以便我们可以使用 ES7 装饰器：在 package.json 中的 devDependencies 中 
 		
 		"babel-plugin-transform-decorators-legacy": "^1.3.4"
 	
 或者在当前目录下
 		
 		npm i babel-plugin-transform-decorators-legacy --save-dev
 		
3. 在 babelrc 文件来配置插件：

		"plugins": ["transform-decorators-legacy"]


	> MobX 支持 「注解」。<br />
	> 这里的注解就是 ES7 中的 decorators (装饰者模式)。<br />
	> 使用注解需要安装相关的插件支持，即上面安装的装饰器插件。<br />
	> 当然，你也可以不使用这种方式。[详情请戳这里](https://cn.mobx.js.org/best/decorators.html)。
	

### 一个简单的计数器
1. 首选需要一个可观察的计数器
		
		class CounterStore {
    		@observable counter = 0;
    	}
    	
    	const counterStore = new CounterStore();
   
2. 创建一个观察者，即我们的计数器视图
	
		@observer
		export default class Counter extends React.Component {
    		_add = () => {
        		counterStore.counter ++;
    		}
			
    		_minus = () => {
        		counterStore.counter --;
    		}

    		render() {
        		return ...
    		}
		}

在点击 + 和 - 按钮的时候，改变计数器的值，页面中计数器的显示值也会随之变化，回忆一下传统的写法，需要调用 setState 才能重新渲染页面。

当然，上面是直接在视图里面直接改变计数器的值，这样是违背设计模式的原则的，修改成下面的样子。

	class CounterStore {
    	@observable counter = 0;

    	@action
   		add = () => {
       	this.counter ++;
   		}
    
   		@action    		
   		minus = () => {
        	if (this.counter > 0) {
           		this.counter --;
        	}
    	}
	}
	
	const counterStore = new CounterStore();
	
	@observer
	export default class Counter extends React.Component {
    	_add = () => {
			// counterStore.counter ++;
	       counterStore.add();
    	}
			
    	_minus = () => {
			// counterStore.counter --;
	       counterStore.minus();
    	}

   		render() {
      		return ...
   		}	
   	}
   	
注意到上面 CounterStore 中的方法前面的 @action，对于任何应用都有动作。动作是任何用来修改状态的东西。 使用 MobX 你可以在代码中显式地标记出动作所在的位置。 动作可以有助于更好的组织代码。对计数器来说，add 和 minus 就是他的动作，因为这个🌰过于简单，这里将 @action 去掉之后，计数器仍然能正常运作。

![计数器效果图](https://github.com/redye/react-native-mobx-demo/blob/master/counter.gif)

### TodoList 实践 —— 在 FlatList 中的应用
我们已经学会了 MobX 最基础的用法，下面就开始学些一个 Todo List 吧。

1. 同样的第一步，还是需要一个 Store，这里我们就叫做 TodoStore。
		
		import {
	    	observable,
	    	action,
	    	autorun,
	    	computed,
		} from 'mobx';

		class TodoStore {
		    @observable todos = [];
		
		    ...
		}
		
		const todoStore = new TodoStore();
		export default todoStore;
	
2. 我们在 FlatList 中将这个 List 展示出来。这次我们希望能复杂点，让这个 Store 可以在多个页面间流转。所以在 root 部分：
		
		<Provider store={TodoStore}>
        		<TodoListPage />
    	</Provider>

然后，在 TodoListPage 里：
		
		@inject('store')
		@observer
		export default class TodoListPage extends React.Component {
				...
		}

> 注意这里使用的 `Provider` 和 `inject`<br />
> `Provider `：可以用来使用 React 的context机制来传递 store 给子组件。<br />
> `inject `：相当于Provider 的高阶组件。可以用来从 React 的context中挑选 store 作为 prop 传递给目标组件。

然后在使用时，就可以通过 ***props*** 取得 store。

	get dataSource() {
        return this.props.store.allTodos.slice();
    }
	  
#### MobX + FlatList 踩过的坑  
1. 这里需要对 store 的数组需要调用 slice()，因为 FlatList 的 data 接收的是一个普通数组。 否则，当数组长度变化时，并不会更新 FlatList。

> 请记住无论如何 Array.isArray(observable([])) 都将返回 false ，所以无论何时当你需要传递 observable 数组到外部库时，通过使用 array.slice() 在 observable 数组传递给外部库或者内置方法前创建一份浅拷贝(无论如何这都是最佳实践)总会是一个好主意。 换句话说，Array.isArray(observable([]).slice()) 会返回 true。

2. FlatList 并不响应 observale 数据的变化，传递给FlatList的呈现回调不是从@observer中调用的，而是从FlatList中调用的，它不是观察者。 因此，在这些回调中访问的观察值不会被跟踪。 为了解决这个问题，试着把它们包装在 `<Observer>` 中，像这样：

> Note that the render callbacks passed to FlatList are not called from @observer, but from the FlatList, which isn't an observer. Thefore the observables accessed inside these callbacks are not tracked. To solve this try to wrap them in `<Observer>` [like this](https://github.com/mobxjs/mobx/issues/1142)

		import { 
		    Observer 
		} from 'mobx-react/native';

		_renderHeader = () => {
	        return (
	            <Observer>{() => {
	                return (
	                    <View style={styles.headerContainer}>
	                        <Text>当前进度    {this.props.store.currentProgress}</Text>
	                    </View>
	                );
	            }}
	            </Observer>
	        );
	    }
	    
	    _renderItem = ({item, index}) => {
	        return (
	            <Observer>
	                {() => {
	                    return (
	                        <View style={styles.itemContainer}>
	                            ...
	                        </View>
	                    );
	                }}
	            </Observer>
	        );
	    }


被 `<Observer>` 包裹的代码，当 todo 数组里面的内容发生变化时，响应在视图上。
![todo效果图](https://github.com/redye/react-native-mobx-demo/blob/master/todo.gif)
