<template>
  <NScrollbar class="max-h-360px">
    <NList>
      <NListItem
        v-for="(item, index) in list"
        :key="item.id"
        class="hover:bg-#f6f6f6 dark:hover:bg-dark cursor-pointer"
        @click="handleRead(index)"
      >
        <NThing class="px-15px" :class="{ 'opacity-30': item.isRead }">
          <template #avatar>
            <NAvatar v-if="item.avatar" :src="item.avatar" />
            <BaseSvgIcon
              v-else
              class="text-34px text-primary"
              :icon="item.icon"
              :local-icon="item.svgIcon"
            />
          </template>
          <template #header>
            <NEllipsis :line-clamp="1">
              {{ item.title }}
              <template #tooltip>
                {{ item.title }}
              </template>
            </NEllipsis>
          </template>
          <template v-if="item.tagTitle" #header-extra>
            <NTag v-bind="item.tagProps" size="small">{{ item.tagTitle }}</NTag>
          </template>
          <template #description>
            <NEllipsis v-if="item.description" :line-clamp="2">
              {{ item.description }}
            </NEllipsis>
            <p>{{ item.date }}</p>
          </template>
        </NThing>
      </NListItem>
    </NList>
  </NScrollbar>
</template>
<script lang="ts" setup>
defineOptions({ name: 'MessageList' })

interface Props {
  list?: App.MessageList[]
}

withDefaults(defineProps<Props>(), {
  list: () => [],
})

interface Emits {
  (e: 'read', val: number): void
}

const emit = defineEmits<Emits>()

function handleRead(index: number) {
  emit('read', index)
}
</script>
