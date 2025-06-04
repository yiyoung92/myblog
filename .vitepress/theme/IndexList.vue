<script setup>
import { computed } from 'vue'
import { data } from './post.data'

const props = defineProps({
  tagList: {
    type: Array,
    default: () => []
  },
  linkList: {
    type: Array,
    default: () => []
  }
})

const { yearMap, postMap, tagMap, linkMap } = data

//按tags来建立索引
// 获取全部tags
// const tagList = Object.keys(tagMap).sort()
// 动态 tags
const tagsToShow = computed(() =>
  props.tagList.length ? props.tagList : []
)
const computedTagMap = computed(() => {
  let result = {}
  for (let tag of tagsToShow.value) {
    if (tagMap[tag]) {
      result[tag] = tagMap[tag].map(url => postMap[url])
    } else {
      result[tag] = []
    }
  }
  return result
})

//按Link来建立索引
// 获取全部link
// const linksToShow = Object.keys(linkMap).sort()
// 动态 links
const linksToShow = computed(() =>
  props.linkList.length ? props.linkList : []
)
const computedLinkMap = computed(()=> {
  let result = {}
  for(let key of linksToShow.value) {
    if (linkMap[key]) {
      result[key] = linkMap[key].map(url => postMap[url])
    } else {
      result[key] = []
    }
  }
  return result
})

//按year来建立索引,需要的时候把下面代码去掉注释
// const yearList = Object.keys(yearMap).sort((a, b) => b - a); // 按年份降序排序
// const computedYearMap = computed(()=> {
//   let result = {}
//   for(let key in yearMap) {
//     result[key] = yearMap[key].map(url => postMap[url])
//   }
//   return result
// })
</script>

<template>
  <div class="max-w-screen-lg w-full px-6 py-8 my-0 mx-auto">
    <!-- 按tags展示 -->
    <template v-if="tagsToShow.length">
      <div v-for="tag in tagsToShow" :key="tag" class="mb-8">
        <div class="pt-3 pb-2 text-xl font-serif font-bold">{{ tag }}</div>
        <div v-for="(article, idx) in computedTagMap[tag]" :key="idx" class="flex justify-between items-center py-1 pl-6">
          <a v-text="article.title" :href="article.url" class="post-dot overflow-hidden whitespace-nowrap text-ellipsis underline" style="color: #b39ddb;"></a>
          <div v-text="article.date.string" class="pl-4 font-serif whitespace-nowrap"></div>
        </div>
      </div>
    </template>

    <!-- 展示 linkList -->
    <template v-if="linksToShow.length">
      <div v-for="link in linksToShow" :key="link">
        <div
          class="pt-3 pb-2 text-xl font-serif font-bold"
          v-text="link.replace(/^\[\[/, '').replace(/\]\]$/, '')"
        ></div>
        <div v-for="(article, idx) in computedLinkMap[link]" :key="idx" class="flex justify-between items-center py-1 pl-6">
          <a v-text="article.title" :href="article.url" class="post-dot overflow-hidden whitespace-nowrap text-ellipsis underline" style="color: #b39ddb;"></a>
          <div v-text="article.date.string" class="pl-4 font-serif whitespace-nowrap"></div>
        </div>
      </div>
    </template>

    <!-- 如都不传，可以按需展示年份索引或留空，需要的时候把下面的代码去掉注释 -->
    <!-- <template v-else>

    <div class="max-w-screen-lg w-full px-6 py-8 my-0 mx-auto">
    <div v-for="year in yearList" :key="year">
        <div v-text="year" class="pt-3 pb-2 text-xl font-serif"></div>
        <div v-for="(article, index2) in computedYearMap[year]" :key="index2" class="flex justify-between items-center py-1 pl-6">
            <a v-text="article.title" :href="article.url" class="post-dot overflow-hidden whitespace-nowrap text-ellipsis">
            </a>
            <div v-text="article.date.string" class="pl-4 font-serif whitespace-nowrap" >
            </div>
        </div>
    </div>
    </div>   

    </template> -->
  </div>
</template>

