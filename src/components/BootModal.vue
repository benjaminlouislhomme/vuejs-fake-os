<script>

  export default {

    props: ['title', 'subtitle'],

    data() {
      return {
        progress: -1,
        seen: true,

        icons: [ 'dir', 'file', 'at', 'trash', ],
      }
    },

    // methods: {},

    computed: {
    	fill() {
    		const ProgressBar = document.getElementById('progress-bar')

    		return this.progress / ProgressBar.clientWidth * 100
    	}
    },

    // created() {},

    mounted() {

    	let interval = setInterval(() => {
    		this.progress ++

    		if (this.progress >= this.icons.length) {
    			clearInterval(interval)
    			this.seen = false
    		}

    	}, 1000)
    }
  }

</script>

<template>
  
  <div id="boot-modal" v-show="seen">
    
    <div id="box">

    	<div id="smiley">
    		<span>:-)</span>
    	</div>

    	<div id="brand">
    		<h1>{{ title }}</h1>
	      <h2>{{ subtitle }}</h2>
    	</div>

      <br><br>

      <div id="icons">
      	<div v-for="icon, i in icons" class="icon">
      		<img
      			:src="'./default_icons/' + icon + '.png'"
      			v-show="i <= progress"
      		/>
      	</div>
      </div>

    </div>

  </div>

</template>

<style scoped>

	#boot-modal {
		width: 100vw;
		height: 100vh;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1;
		background: AliceBlue;
		text-align: center;
	}

	#box {
		width: 50vw;
		height: 60vh;
		background: white;
		border: 1px solid #ccc;
		margin: auto;
		margin-top: 10vh;
	}

	#smiley {
		font-size: 10em;
		transform: rotate(90deg);
		color: Blue;
	}

	#smiley span {
		border: 1px solid #ccc;
		background: AliceBlue;
		padding: 0 1vw 1vw 1vw;
	}

	#icons {
		display: flex;
		width: 80%;
		height: 15%;
		margin: auto;
		justify-content: space-between;
	}

	.icon {
		width: 12%;
		height: 100%;
	}

	.icon img {
		width: 100%;
		height: auto;
	}

</style>
