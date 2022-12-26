const toX = () => 'X';

var delay = (secs) => new Promise((res) => {
  setTimeout(() => res("done"), secs * 1000);
});

const tasks = [
  delay(1),
  delay(5),
  delay(4),
  delay(3),
  delay(1),
  delay(3)
];

delay(5).then(console.log);

class PromiseQueue {
  constructor(pro = [], concurrent = 1) {
    this.concurrent = concurrent;
    this.total = pro.length;
    this.todo = pro;
    this.running = [];
    this.complete = [];
  }

  get runAnother() {
    return (this.running.length < this.concurrent) && this.todo.length;
  }

  graphTasks() {
    const {
      todo,
      running,
      complete
    } = this;
    console.log(`
    todo: [${todo.map(toX)}]
    running: [${running.map(toX)}]
    complete: [${complete.map(toX)}]
    `);
  }

  run() {
    while (this.runAnother) {
      let promise = this.todo.shift();
      this.running.push(promise);
      promise.then(() => {
        this.complete.push(this.running.shift());
        this.graphTasks();
        this.run();
      });
    }
  }
}

const delayQueue = new PromiseQueue(tasks, 2);
delayQueue.run();