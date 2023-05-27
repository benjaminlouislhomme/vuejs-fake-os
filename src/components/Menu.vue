<script>

  export default {
    props: ['menu'],

    data() {
      return {
        //
      }
    },

    methods: {
      open() {
        if (this.openMenu == this.menu.title) {
          this.close()
        }

        else {
          this.openMenu = this.menu.title
        }
      },

      close() {
        this.openMenu = null
      },

      titleOver() {
        this.openMenu ? this.openMenu = this.menu.title : null
      },

      doAction(item) {
        const method = item.toLowerCase().replace(' ', '')

        if (method in this.$root) {
          const action = this.$root[method]
          action()
        }
      },

      methodExists(item) {
        const method = item.toLowerCase().replace(' ', '')

        return method in this.$root
      }
    },

    computed: {
      openMenu: {
        get() {
          return this.$parent.openMenu
        },

        set(title) {
          this.$parent.openMenu = title
        }
      },

      background() {
        return (this.openMenu == this.menu.title) ? 'black' : 'white'
      },

      color() {
        return (this.openMenu == this.menu.title) ? 'white' : 'black'
      },
    },

    // created() {}

  }

</script>

<template>

  <div class="menu">

    <div
      @click.stop="open()"
      @mouseover="titleOver()"
      class="menu-title"
      :style="{ background: background, color: color }"
    >
      {{ menu.title }}
    </div>

    <ul v-show="openMenu == menu.title">
      <li
        v-for="item in menu.items"
        @click="doAction(item), close()"
        :class="{ active: methodExists(item) }"
      >
        {{ item }}
      </li>
    </ul>

  </div>

</template>

<style scoped>

  .menu {
    z-index: 1;
    font-size: 1.2em;
  }

  .menu-title {
    padding: 2px 10px 2px 10px;
    cursor: pointer;
  }

  .menu ul {
    min-width: 120px;
    list-style: none;
    padding: 0;
    margin: 0;
    position: absolute;
    z-index: 1;
    background: white;
    border: 1px solid #aaa;
    border-radius: 0 0 4px 4px;
  }

  .menu ul li {
    padding: 4px;
    color: gray;
  }

  .menu ul li.active {
    cursor: pointer;
    color: black !important;
  }

  .menu ul li.active:hover {
    color: white !important;
    background: black;
  }

</style>