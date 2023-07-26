<template>
	<tui-top-dropdown
		:show="value"
		:translatey="translatey"
		:height="0"
		@close="$emit('input', false)"
	>
		<view class="container">
			Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestiae
			laboriosam a maiores nihil perspiciatis incidunt dolorem saepe fugiat,
			rerum tempora voluptates! Corrupti recusandae ipsum eum ducimus nam
			ratione dicta explicabo.
		</view>
	</tui-top-dropdown>
</template>

<script>
export default {
	props: {
		value: {
			type: Boolean,
			required: true
		},

		translatey: {
			type: Number,
			required: true
		}
	}
}
</script>
