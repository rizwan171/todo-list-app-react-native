import React from "react";
import { FlatList, ListRenderItem, ListRenderItemInfo, StyleSheet, TouchableOpacity, View } from "react-native";
import TaskItem from "./TaskItem";
import { Task } from "../types/model/Task";
import { TaskListProps } from "../types/props/TaskListProps";

const TaskList = ({ tasks, completeTask }: TaskListProps) => {
  const renderItem = (itemData: ListRenderItemInfo<Task>) => {
    return (
      // TODO update this to complete when the square icon on left is pressed instead of whole thing
      <TouchableOpacity key={itemData.index} onPress={() => completeTask(itemData.index)}>
        <TaskItem task={itemData.item} />
      </TouchableOpacity>
    );
  };

  return <FlatList data={tasks} renderItem={renderItem} style={styles.tasks} />;
};

const styles = StyleSheet.create({
  tasks: {
    marginTop: 30,
  },
});

export default TaskList;
