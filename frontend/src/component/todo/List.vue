<template>
  <div :class="$style.container">
    <div style="display: flex; align-items: center; margin-bottom: 10px">
      <Input placeholder="Filter..." v-model="filter" />
      <div>&nbsp;</div>
      <Button text="Add new" icon="add" @click="isAdd = true" style="flex: none" />
    </div>
    <div :class="$style.list">
      <div
        v-for="note in list.filter((x) => x.description.match(new RegExp(filter, 'ig')))"
        :key="note.id"
        :class="$style.block"
        :style="note.priority < 0 ? { opacity: 0.5 } : {}"
      >
        <div :class="$style.header">
          <!-- Left -->
          <div :class="$style.left" v-html="checkTime($root.moment(note.deadline).fromNow())"></div>
          <div :class="$style.left2">
            {{ note.priority }}
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
            {{ $root.moment(note.created).fromNow() }}
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
      this.list = await RestApi.todo.getList();
    },
    async remove(id: string) {
      if (confirm('Are you sure?')) {
        await RestApi.todo.delete(id);
      }
      this.refresh();
    },
    replaceFilter(x: string) {
      if (!this.filter) {
        return x;
      }
      return x.replace(new RegExp(`(${this.filter})`, 'ig'), `<span class='hilight'>$1</span>`);
    },
    checkTime(str: string) {
      if (str.match(/ago/)) {
        return `<span style="color: #ff5c5c; font-weight: bold;">${str}</span>`;
      }
      return str;
    },
  },
  data: () => {
    return {
      isAdd: false,
      isEdit: false,
      editId: '',
      list: [],
      filter: '',
    };
  },
});
</script>

<style lang="scss" module>
.container {
  height: calc(100% - 105px);

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
