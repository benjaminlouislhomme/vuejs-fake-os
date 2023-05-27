<script>

  import Icon from './Icon.vue'

  export default {
    props: ['element'],

    components: { Icon },

    data() {
      return {
        selected: null,
        left: 0,
        top: 0,
      }
    },

    methods: {
      close() {
        const index = this.windows.indexOf(this.element)
        this.$root.windows.splice(index, 1)

        this.element.open = false
      }
    },

    computed: {
      onTop: {
        get() {
          return this.$root.onTop
        },
        set(element) {
          this.$root.onTop = element
        }
      },

      isOnTop() {
        return this.onTop == this.element
      },

      windows() {
        return this.$root.windows
      },

      windowStyle() {
        return {
          'color': this.isOnTop ? 'black' : 'gray',
          'z-index': this.isOnTop ? 1 : 0,

          left: this.element.position.window.x + 'vw',
          top: this.element.position.window.y + 'vh',
          width: this.element.size.width + 'vw',
          height: this.element.size.height + 'vh',
        }
      },
    },

    created() {
      const indexOfElement = this.$parent.elements.indexOf(this.element)

      this.left = (indexOfElement + 1) * 100
      this.top = (indexOfElement + 1) * 100
    }
  }

</script>

<template>

  <div
    class="window"
    v-show="element.open"
    :style="windowStyle"
    @click.stop="onTop = element"
    v-drag="{ handle: '.window-header' }"
    v-resize="{ handle: '.resizer' }"
  >
    <div class="window-header">
      <div class="window-close">
        <button @click="close()">&nbsp;</button>
      </div>

      <div class="window-title" :style="{ padding: '0 10px 0 10px' }">
        {{ element.title }}
      </div>

      <div class="window-header-background">
        <div v-for="i in 6"></div>
      </div>
    </div>

    <div class="window-body" @click="selected = null">
      <div v-if="element.type == 'dir'" style="display: flex;">
        <Icon
          v-for="element in element.elements"
          :element="element"
        ></Icon>
      </div>

      <div v-if="element.type == 'file'" style="text-align: center;">

        <div v-if="element.content" class="content">

          <div v-if="Array.isArray(element.content)">
            <p v-for="item in element.content" v-html="item"></p>
          </div>

          <div v-else>
            <p v-html="element.content"></p>
          </div>
        </div>

        <div v-if="element.file" style="width: 100%; height: 100%;">
          <p v-if="element.file.type == 'img'">
            <img :src="element.file.url" />
          </p>
        </div>

        <div v-if="element.link">
          <a :href="element.link" target="_blank">Découvrir >></a>
        </div>

      </div>
    </div>

    <div class="resizer"></div>

  </div>

</template>

<style scoped>
  
  .window {
    position: absolute; 
    left: 50px;
    top: 50px; 
    border: 1px solid black;
    padding: 4px;
    background: #eee;
  }

  .window-header {
    min-width: 100%; 
    height: 25px; 
    display: flex;
  }

  .window-header-background {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  }

  .window-header-background div {
    width: 100%;
    height: 2px;
    background: #666;
    margin-top: 2px;
  }

  .window-close button {
    width: 20px;
    height: 20px;
    margin-left: 5px;
    border: 1px solid black;
    border-radius: 0;
    cursor: pointer;
  }

  .window-title {
    background: white;
    margin: auto;
    font-weight: bold;
    height: 100%;
    text-align: center;
  }

  .window-body {
    padding-top: 5%;
    border: 1px solid gray;
    background: white;
    width: calc(100% - 2px);
    height: calc(100% - 25px);
    overflow: hidden;
  }

  .content {
    padding: 2%;
  }

  p {
    padding-bottom: 3px;
  }

  a {
    color: blue !important;
    padding: 5px 10px 5px 10px;
    border-radius: 5px;
  }

  a:hover {
    background: AliceBlue !important;
  }

  .resizer {
    width: 1.5vmax; 
    height: 1.5vmax; 
    background: white;
    border: 1px solid gray;
    position: absolute;
    bottom: 0;
    right: 0;
    cursor: nwse-resize;
  }

</style>