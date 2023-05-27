<script>
  import BootModal from './components/BootModal.vue'
  import MenuBar from './components/MenuBar.vue'
  import Icon from './components/Icon.vue'
  import Window from './components/Window.vue'

  export default {

    components: { BootModal, MenuBar, Icon, Window },

    data() {
      return {

        menus: [
          {
            title: 'O',
            items: ['About', 'Settings', 'Reboot', 'Shut down'],
          },
          {
            title: 'File',
            items: ['New', 'Save', 'Close', 'Quit'],
          },
          {
            title: 'Edit',
            items: ['Copy', 'Paste', 'Cut'],
          },
          {
            title: 'View',
            items: ['Show', 'Hide'],
          },
        ],

        selected: null,
        windows: [],
        onTop: null,

        datas: {
          title: "VueJs fake-os",
          subtitle: "by @blouislhomme",
          elements: [],
        },

        bootModal: true,
      }
    },

    methods: {

      shutdown() {
        const { body } = document
        body.innerHTML = ''
        body.style.background = 'black'
      },

      reboot() {
        window.location.href = ''
      },

      new() {
        this.elements = [...this.elements, {
          title: 'Nouveau dossier',
          type: 'dir',
          position: {
            icon: { x: 1, y: 1 },
            window: { x: 1, y: 1 }
          },
        }]
      },

      // save() {
      //   console.log('save')
      // },

      quit() {
        window.close()
      },

      /**/

      setIconsPositionsAndWindowsSizes(elements) {

        const callback = (elements) => {

          if (Array.isArray(elements)) {

            elements.forEach((element, n) => {

              element.open = false

              if (!('position' in element)) {

                element.position = {}

                var icon = { x: 0, y: 0 }
                var window = { x: 0, y: 0 }

                const prevElement = elements[n - 1] ?? null

                if (elements[n - 1]) {
                  icon.x = prevElement.position.icon.x + 10
                  icon.y = prevElement.position.icon.y
                
                  window.x = prevElement.position.window.x + 5
                  window.y = prevElement.position.window.y + 5
                }
                else {
                  icon.x = 5
                  icon.y = 5
                
                  window.x = 5
                  window.y = 5
                }

                element.position = { icon, window }
              }

              if (!('size' in element)) {
                if (element.type == 'dir') {
                  element.size = { width: 65, height: 50 }
                }

                else if (element.type == 'file') {
                  element.size = { width: 30, height: 70 }
                }
              }

              if ('elements' in element) {
                callback(element.elements)
              }
            })
          }
        }

        callback(this.elements)
      }

    },

    computed: {
      elements: {
        get() {
          return this.datas.elements
        },

        set(elements) {
          this.datas.elements = elements
        }
      }
    },

    watch: {
      elements(elements) {
        this.setIconsPositionsAndWindowsSizes(elements)
      }
    },

    // mounted() {},

    async created() {

      console.clear()

      // Check is not mobile device
      if (navigator.userAgent.toLowerCase().match(/mobile/i)) {
        document.body.innerHTML = `
          <p style="text-align: center; margin-top: 10vw">
            THIS APP RUN IN DESKTOP DEVICE ONLY, SORRY.
          </p>
        `
      }

      // Disable boot modal if asked
      const urlParams = new URLSearchParams(window.location.search)
      const bootmodal = urlParams.get('bootmodal')

      if (bootmodal === 'false') {
        this.bootModal = false
      }

      // Loading the datas tree
      if ('VITE_DATAS_ENDPOINT' in import.meta.env) {
        const { VITE_DATAS_ENDPOINT } = import.meta.env

        this.datas = await fetch(VITE_DATAS_ENDPOINT)
          .then(response => response.json())
          .then(response => response)
      }
      else {
        this.elements = [
          { title: 'Foo', type: 'file' },
          { title: 'Bar', type: 'dir', elements: [
              { title: 'Fizz', type: 'file', },
              { title: 'Buzz', type: 'file', }
            ]
          }
        ]
      }

      // Setting elements positions & sizes
      this.setIconsPositionsAndWindowsSizes(this.elements)

      // Delete selected element pressing Backspace
      document.body.addEventListener('keydown', ({ key }) => {
        if (key == 'Backspace') {
          const indexOfElement = this.elements.indexOf(this.selected)
          this.elements.splice(indexOfElement, 1)
        }
      })
    }
    
  }

</script>

<template>
  
  <MenuBar key="menu-bar" :menus="menus"/>

  <div id="desktop" @click="selected = null">

    <div id="brand">
      <h1 v-if="datas.title">{{ datas.title }}</h1>
      <h2 v-if="datas.subtitle">{{ datas.subtitle }}</h2>
      <p
        id="description"
        v-if="datas.description"
      >
        {{ datas.description }}
      </p>
    </div>

    <Icon v-for="element in elements" :element="element"></Icon>
  </div>

  <Window v-for="element in windows" :element="element"></Window>

  <BootModal
    :title="datas.title"
    :subtitle="datas.subtitle"
    v-if="bootModal"
  />

</template>

<style scoped>

  * {
    -webkit-user-select: none;  
    -moz-user-select: none;    
    -ms-user-select: none;      
    user-select: none;
  }

  #desktop {
    width: 100vw;
    height: calc(100vh - 30px);
    background: AliceBlue;
    padding-top: 2%;
    text-align: center;
  }

  #brand {
    opacity: .2;
    width: 70%;
    height: 50%;
    margin: auto;
  }

  #brand h1 {
    font-size: 5em;
  }

  #brand h2 {
    font-size: 3em;
  }

  #description {
    font-size: 1.6em;
    font-weight: bold;
  }

</style>
