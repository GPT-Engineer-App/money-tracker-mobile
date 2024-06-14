import React, { useState, useEffect } from 'react';
import { Container, VStack, HStack, Input, Button, Heading, useToast, Box, IconButton } from "@chakra-ui/react";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { FaEdit, FaTrash } from 'react-icons/fa';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState(null);
  const toast = useToast();

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (!taskText) {
      toast({
        title: "Error",
        description: "Task cannot be empty.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (isEditing) {
      setTasks(tasks.map(task => task.id === currentTaskId ? { ...task, text: taskText } : task));
      setIsEditing(false);
      setCurrentTaskId(null);
    } else {
      setTasks([...tasks, { id: Date.now(), text: taskText }]);
    }

    setTaskText("");
  };

  const handleEditTask = (id) => {
    const taskToEdit = tasks.find(task => task.id === id);
    setTaskText(taskToEdit.text);
    setIsEditing(true);
    setCurrentTaskId(id);
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedTasks = Array.from(tasks);
    const [removed] = reorderedTasks.splice(result.source.index, 1);
    reorderedTasks.splice(result.destination.index, 0, removed);

    setTasks(reorderedTasks);
  };

  return (
    <Container centerContent maxW="container.sm" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center" p={4}>
      <VStack spacing={4} width="100%">
        <Heading as="h1" size="xl" mb={6}>To-Do List</Heading>
        <HStack width="100%">
          <Input
            placeholder="Enter task"
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            size="md"
          />
          <Button colorScheme="teal" size="md" onClick={handleAddTask}>
            {isEditing ? "Edit Task" : "Add Task"}
          </Button>
        </HStack>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="tasks">
            {(provided) => (
              <VStack {...provided.droppableProps} ref={provided.innerRef} spacing={4} width="100%">
                {tasks.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                    {(provided) => (
                      <HStack
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        width="100%"
                        p={4}
                        bg="gray.100"
                        borderRadius="md"
                        justifyContent="space-between"
                      >
                        <Box>{task.text}</Box>
                        <HStack>
                          <IconButton
                            icon={<FaEdit />}
                            onClick={() => handleEditTask(task.id)}
                            size="sm"
                            colorScheme="blue"
                          />
                          <IconButton
                            icon={<FaTrash />}
                            onClick={() => handleDeleteTask(task.id)}
                            size="sm"
                            colorScheme="red"
                          />
                        </HStack>
                      </HStack>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </VStack>
            )}
          </Droppable>
        </DragDropContext>
      </VStack>
    </Container>
  );
};

export default TodoList;