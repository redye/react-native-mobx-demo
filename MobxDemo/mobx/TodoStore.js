import {
    observable,
    action,
    autorun,
    computed,
} from 'mobx';

class TodoStore {
    @observable 
    todos = [];

    constructor() {
        autorun(() => {
            console.log('report ==>', this.report);
        });

        this.add('一人之下');
        this.add('灵契');
        this.add('少年锦衣卫');
    }

    @computed get completedTodosCount() {
        return this.todos.filter((todo) => {
            return todo.completed === true;
        }).length;
    }

    @computed get currentProgress() {
        if (this.todos.length === 0) {
            return '<none>';
        }
        return `${this.completedTodosCount}/${this.todos.length}`;
    }

    @computed get allTodos() {
        return this.todos;
    }

    get report() {
        if (this.todos.length === 0) {
            return "<none>";
        }

        return `Next todo: "${this.todos[0].task}". ` + 
        `Progress: ${this.completedTodosCount}/${this.todos.length}`;
    } 

    @action 
    add(task) {
        this.todos.push({
            task: task,
            completed: false,
            assignee: null,
        });
    }

    @action 
    delete() {
        this.todos.pop();
    }

    @action 
    edit(item, index) {
        item.completed = true;
    }

    @action
    update(item, index) {
        this.todos.slice(index, 1, item);
    }
}

const todoStore = new TodoStore();
export default todoStore;