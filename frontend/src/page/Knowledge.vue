<template>
  <div :class="$style.knowledge">
    <!-- Header -->
    <div :class="$style.header">
      <div :class="$style.total"><b>Total</b>: {{ $store.state.knowledge.list.length }}</div>
      <ui-input placeholder="Filter..." v-model="filter" style="margin-right: 5px" />
      <ui-button
        icon="plus"
        @click="
          $store.dispatch('modal/show', {
            name: 'knowledge/add',
            data: {
              description: '',
              tags: '',
              created: $root.moment().format('YYYY-MM-DD HH:mm:ss'),
            },
            onSuccess() {
              $store.dispatch('knowledge/add', this.cloneData());
            },
          })
        "
        style="flex: none; padding: 7px; border-radius: 0"
      />
      <ui-button
        v-if="$store.state.knowledge.tag"
        text="Back"
        @click="$store.state.knowledge.tag = ''"
        style="flex: none; margin-left: 7px; border-radius: 0"
      />
    </div>

    <!-- Tags -->
    <div v-if="!$store.state.knowledge.tag" :class="$style.tags">
      <div
        class="clickable"
        @click="$store.state.knowledge.tag = k"
        :class="[$style.tag, k === $store.state.knowledge.tag ? $style.selected : '']"
        v-for="(v, k) in $store.state.knowledge.tags"
        :key="k"
      >
        {{ k }} <b style="margin-left: 5px">({{ v }})</b>
      </div>
    </div>

    <!-- List -->
    <div v-if="$store.state.knowledge.tag" :class="$style.list">
      <div v-for="knowledge in list" :key="knowledge.id" :class="$style.block">
        <div :class="$style.header">
          <!-- Left -->
          <div :class="$style.left">
            {{ knowledge.tags.join(', ') }}
          </div>

          <!-- Icons -->
          <img
            @click="
              $store.dispatch('modal/show', {
                name: 'knowledge/edit',
                data: {
                  ...knowledge,
                  created: $root.moment(knowledge.created).format('YYYY-MM-DD HH:mm:ss'),
                },
                onSuccess() {
                  $store.dispatch('knowledge/update', this.cloneData());
                },
              })
            "
            class="clickable"
            src="../asset/pencil.svg"
            alt=""
            style="margin-left: auto"
          />
          <img @click="remove(knowledge.id)" class="clickable" src="../asset/trash.svg" alt="" />

          <!-- Time -->
          <div :class="$style.right">
            {{ $root.moment(knowledge.created).format('DD MMM YYYY HH:mm') }}
          </div>
        </div>
        <div :class="$style.body" v-html="$root.format(knowledge.description)"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { RestApi } from '@/util/RestApi';
import { IKnowledge } from '@/store/knowledge';
//import Add from './Add.vue';
//import Edit from './Edit.vue';

export default defineComponent({
  props: {},
  components: {},
  computed: {
    list(): IKnowledge[] {
      let baseList = [];
      baseList = this.$store.state.knowledge.list.filter(
        (x: IKnowledge) =>
          x.tags.filter((y: string) => y === this.$store.state.knowledge.tag).length > 0,
      );
      return baseList.filter((x: IKnowledge) => x.description.match(new RegExp(this.filter, 'ig')));
    },
  },
  async mounted() {
    await this.$store.dispatch('knowledge/getList');
    // await this.refresh();
  },
  methods: {
    /*async refresh() {
      this.list = (await RestApi.knowledge.getList()) as any[];
      this.tags = {
        // all: 0,
      };
      for (let i = 0; i < this.list.length; i++) {
        for (let j = 0; j < this.list[i].tags.length; j++) {
          this.tags[this.list[i].tags[j]] = ~~this.tags[this.list[i].tags[j]] + 1;
          // this.tags['all'] += 1;
        }
      }
    },*/
    /*getList() {
      let baseList = [];
      if (this.tag === 'all') {
        baseList = this.list;
      } else {
        baseList = this.list.filter(
          (x: any) => x.tags.filter((y: any) => y === this.tag).length > 0,
        );
      }

      return baseList.filter((x) => x.description.match(new RegExp(this.filter, 'ig')));
    },*/
    async remove(id: string) {
      if (confirm('Are you sure?')) {
        //await RestApi.knowledge.delete(id);
        await this.$store.dispatch('knowledge/delete', id);
      }
      //await this.$store.dispatch('knowledge/getList');
      // await this.refresh();
    },
  },
  data: () => {
    return {
      //isAdd: false,
      //isEdit: false,
      //editId: '',
      //list: [] as any[],
      filter: '',
      //tags: {} as any,
      // tag: '',
    };
  },
});
</script>

<style lang="scss" module>
.knowledge {
  height: calc(100% - 145px);
  padding: 10px;

  .header {
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    .total {
      margin-right: 10px;
      color: #979797;
      background: #232323;
      height: 40px;
      display: flex;
      align-items: center;
      padding: 0 10px;
    }
  }

  .tags {
    margin-bottom: 10px;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 10px;

    &::-webkit-scrollbar {
      display: none;
    }

    &::-webkit-scrollbar-thumb {
      display: none;
    }

    .tag {
      background: #9c9c9c;
      padding: 10px;
      border-radius: 4px;
      color: #2b2b2b;
      text-align: center;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;

      &.selected {
        background: #fea400;
      }
    }
  }

  .list {
    height: 100%;
    overflow-y: auto;

    .block {
      font-size: 15px;
      margin-bottom: 15px;

      .header {
        display: flex;

        .left,
        .right,
        .left2 {
          padding: 10px 15px;
          background: #0000004d;
          border-radius: 6px 6px 0 0;
          color: #979797;
          font-weight: bold;

          span {
            color: #979797;
            font-style: italic;
            font-weight: 300;
          }
        }

        .left {
          color: #cfda1e;
        }

        .left2 {
          margin-left: 10px;
          color: #1edaab;
          font-weight: bold;
        }

        img {
          margin-left: 15px;
        }

        .right {
          margin-left: 15px;
        }
      }

      .body {
        padding: 10px 15px;
        background: #0000004d;
        border-radius: 0 0 6px 6px;
        color: #979797;
      }

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>
