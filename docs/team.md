---
layout: page
title: 认识我们的团队
description: 牛搭由一个来自五湖四海且未曾谋面的小团队开放和维护
---

<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamPageSection,
  VPTeamMembers
} from 'vitepress/theme'
import { core } from './_data/team'
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>认识我们的团队</template>
    <template #lead>
      牛搭由一个来自五湖四海且未曾谋面的小团队开放和维护，<br>
      下面是对一些团队成员的介绍。
    </template>
  </VPTeamPageTitle>
  <VPTeamMembers :members="core" />
</VPTeamPage>
