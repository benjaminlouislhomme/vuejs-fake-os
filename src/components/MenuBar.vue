<script>

  import Menu from './Menu.vue'

  export default {
    components: {
      Menu
    },

    directives: {
      'click-outside': (el, binding, vnode) => {
          document.addEventListener('click', (event) => {
            if (event.target.closest('#' + el.getAttribute('id'))) {
              return
            }

            const action = binding.value
            action()
          })
        }
      
    },

    props: ['menus'],

    data() {
      return {
        openMenu: null,
        date: new Date(),
      }
    },

    methods: {
      close() {
        this.openMenu = null
      },
    },

    created() {
      setInterval(() => {
        this.date = new Date()
      }, 1000)
    },

    // mounted() {}
  }

</script>

<template>
  
  <div id="menu-bar" v-click-outside="close">
    <div id="menus">
      <Menu v-for="menu in menus" :menu="menu"></Menu>
    </div>
    <div id="clock">

      <div id="date">
        <span>{{ date.getFullYear() }}</span>
        <span> / </span>
        <span>
          {{ date.getMonth() + 1 < 10 ? '0' : '' }}{{ date.getMonth() + 1 }}
        </span>
        <!-- <span>/</span>
        <span>
          {{ date.getDay() < 10 ? '0' : '' }}{{ date.getDay() }}
        </span> -->
      </div>

      <div id="time">
        <span>
          {{ date.getHours() < 10 ? '0' : '' }}{{ date.getHours() }}
        </span>
        <span>:</span>
        <span>
          {{ date.getMinutes() < 10 ? '0' : '' }}{{ date.getMinutes() }}
        </span>
        <span>:</span>
        <span>
          {{ date.getSeconds() < 10 ? '0' : '' }}{{ date.getSeconds() }}
        </span>
      </div>
      
    </div>
  </div>

</template>

<style scoped>

  #menu-bar {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid black;
  }

  #menus {
    display: flex;
  }

  #clock {
    font-size: 1.2em;
    margin-right: 2vw;
    display: flex;
    justify-content: space-between;
    width: 12%;
  }

</style>
