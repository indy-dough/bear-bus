class Events {
  constructor() {
    this.events = {};
  }

  emit(eventName, ...args) {
    this.events[eventName]?.forEach(callback => callback(...args));
  }

  on(eventName, callback) {
    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].push(callback);
  }

  off(eventName, callback) {
    if (!callback) {
      delete this.events[eventName];
    } else if (this.events[eventName]) {
      this.events[eventName] = this.events[eventName].filter(fn => fn !== callback);
    }
  }
}

export default Events;
