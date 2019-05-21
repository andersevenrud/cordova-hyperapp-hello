import { h, app } from 'hyperapp'

const createHyperapp = () => {
  const root = document.querySelector('#app')

  const view = (state, actions) =>
    h('div', {}, [
      h('div', {}, `Counter: ${state.counter}`),
      h('div', {}, [
        h('button', {
          onclick: () => actions.increment()
        }, 'Increment')
      ])
    ])

  app({
    counter: 0
  }, {
    increment: () => ({ counter }) => ({ counter: counter + 1})
  }, view, root)
}

const cordova = {
  initialize() {
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false)
  },

  onDeviceReady() {
    this.receivedEvent('deviceready')

    createHyperapp()
  },

  receivedEvent(id) {
    console.log('Received Event: ' + id)
  }
};

cordova.initialize();
