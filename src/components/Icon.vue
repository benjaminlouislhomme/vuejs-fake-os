<script>

	export default {
		props: ['element'],

		data() {
			return {
				//
			}
		},

		methods: {
			select() {
				this.selected = this.element
			},

			deselect() {
				this.selected = null
			},

			open() {
				this.element.open = true
				this.onTop = this.element
				this.$root.windows.push(this.element)
			},
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

			selected: {
				get() {
					return this.$parent.selected
				},
				set(element) {
					this.$parent.selected = element
				}
			},

			isSelected() {
				return this.selected == this.element
			},

			iconStyle() {
				return {
					'left': this.element.position.icon.x + 'vw',
					'top': this.element.position.icon.y + 'vh',
				}
			},

			iconBodyStyle() {
				return {
					'z-index': (this.onTop == this.element) ? 1 : 0,
				}
			},

			iconTitleStyle() {
				return {
					'font-weight': this.isSelected ? 'bold' : '',
					'background': this.isSelected ? 'gray' : 'transparent',
					'color': this.isSelected ? 'white' : 'black',
				}
			},

			iconImageUrl() {
				if (this.element.icon) {
					return  './icons/' + this.element.icon
				}

				return './default_icons/' + this.element.type + '.png'
			},
		}
	}

</script>

<template>
	
	<div
		class="icon"
		:style="iconStyle"
		@click.stop="select()"
		@dblclick.stop="open()"
		@mousedown="select()"
		v-drag="{}"
		v-if="element.position.icon"
	>
		<div class="icon-body" :style="iconBodyStyle">
			<img :src="iconImageUrl">
		</div>

		<div
			class="icon-title"
			:style="iconTitleStyle"
		>
			{{ element.title }}
		</div>
	</div>

</template>

<style scoped>

	.icon {
		width: 10vmax;
		height: 10vmax;
		margin: auto;
		cursor: pointer;
		z-index: 0;
		text-align: center;
		position: absolute;
	}

	.icon-body {
		width: 80%;
		height: 80%;
		margin: auto;
		border-radius: 5px;
		display: flex;
		align-items: middle;
	}

	.icon-title {
		border-radius: 5px;
		font-size: 1.2em;
	}

</style>