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

        this.add('mobx');
        this.add('redux');
        this.add('swift');
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

    @computed get report() {
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
        console.log('edit =>', index);
        item.completed = true;
        // this.todos.splice(index, 1, item);
    }
}

const todoStore = new TodoStore();
export default todoStore;