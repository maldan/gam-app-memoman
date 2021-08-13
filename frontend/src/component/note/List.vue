<template>
  <div :class="$style.container">
    <div style="display: flex; align-items: center; margin-bottom: 10px">
      <Input placeholder="Filter..." v-model="filter" />
      <div>&nbsp;</div>
      <Button text="Add new" icon="add" @click="isAdd = true" style="flex: none" />
    </div>
    <div :class="$style.tags">
      <div
        class="clickable"
        @click="tag = k"
        :class="[$style.tag, k === tag ? $style.selected : '']"
        v-for="(v, k) in tags"
        :key="k"
      >
        {{ k }} <b>({{ v }})</b>
      </div>
    </div>
    <div :class="$style.list">
      <div v-for="note in getList()" :key="note.id" :class="$style.block">
        <div :class="$style.header">
          <!-- Left -->
          <div :class="$style.left">
            {{ note.tags.join(', ') }}
          </div>

          <!-- Icons -->
          <img
            @click="(editId = note.id), (isEdit = true)"
            class="clickable"
            src="../../asset/pencil.svg"
            alt=""
            style="margin-left: auto"
          />
          <img @click="remove(note.id)" class="clickable" src="../../asset/trash.svg" alt="" />

          <!-- Time -->
          <div :class="$style.right">
            {{ $root.moment(note.created).format('DD MMM YYYY HH:mm') }}
          </div>
        </div>
        <div :class="$style.body" v-html="$root.format(note.description)"></div>
      </div>
    </div>

    <!-- Modal -->
    <Add v-if="isAdd" @close="(isAdd = false), refresh()" />
    <Edit :id="editId" v-if="isEdit" @close="(isEdit = false), refresh()" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { RestApi } from '../../util/RestApi';
import Button from '../Button.vue';
import Input from '../Input.vue';
import Add from './Add.vue';
import Edit from './Edit.vue';

export default defineComponent({
  props: {},
  components: { Button, Add, Edit, Input },
  async mounted() {
    this.refresh();
  },
  methods: {
    async refresh() {
      this.list = (await RestApi.note.getList()) as any[];
      this.tags = {
        all: 0,
      };
      for (let i = 0; i < this.list.length; i++) {
        for (let j = 0; j < this.list[i].tags.length; j++) {
          this.tags[this.list[i].tags[j]] = ~~this.tags[this.list[i].tags[j]] + 1;
          this.tags['all'] += 1;
        }
      }
    },
    getList() {
      let baseList = [];
      if (this.tag === 'all') {
        baseList = this.list;
      } else {
        baseList = this.list.filter(
          (x: any) => x.tags.filter((y: any) => y === this.tag).length > 0,
        );
      }

      return baseList.filter((x) => x.description.match(new RegExp(this.filter, 'ig')));
    },
    async remove(id: string) {
      if (confirm('Are you sure?')) {
        await RestApi.note.delete(id);
      }
      this.refresh();
    },
  },
  data: () => {
    return {
      isAdd: false,
      isEdit: false,
      editId: '',
      list: [] as any[],
      filter: '',
      tags: {} as any,
      tag: 'all',
    };
  },
});
</script>

<style lang="scss" module>
.container {
  height: calc(100% - 145px);

  .tags {
    white-space: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
    margin-bottom: 10px;

    &::-webkit-scrollbar {
      display: none;
    }

    &::-webkit-scrollbar-thumb {
      display: none;
    }

    .tag {
      display: inline-block;
      background: #9c9c9c;
      padding: 5px 10px;
      border-radius: 4px;
      color: #2b2b2b;
      margin-right: 5px;

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
