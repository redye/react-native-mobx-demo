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
	> 当然，你也可以不适用这种方式。[详情请戳这里](https://cn.mobx.js.org/best/decorators.html)。
	

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

当然，上面是直接在视图里面直接改变计数器的值，这样是违背设计模式的原则的，修改成鞋面的样子。

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
我们已经学会了 MobX 最基础的用法，