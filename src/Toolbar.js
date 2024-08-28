import React from 'react';
import { VStack, Box, Icon, Button, Input } from '@chakra-ui/react';
import {
  FiSquare,
  FiMinus,
  FiType,
  FiSave,
  FiArrowRight,
  FiArrowLeft,
  FiPlus,
} from 'react-icons/fi';


const Toolbar = ({
  onAddComponent,
  onSaveHistory,
  setComponents,
  setHistoryIndex,
  history,
  historyIndex,
  setSelectedComponentIndex,
}) => {
  const handleDragStart = (e, type) => {
    e.dataTransfer.setData('component', type);
  };

  const saveWireframe = () => {
    const wireframeData = JSON.stringify(history[historyIndex]);
    const blob = new Blob([wireframeData], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'wireframe.json';
    link.click();
  };

  const loadWireframe = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const loadedComponents = JSON.parse(e.target.result);
      setComponents(loadedComponents);
      onSaveHistory(loadedComponents);
    };
    reader.readAsText(file);
  };

  const undo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setComponents(history[newIndex]);
      setHistoryIndex(newIndex);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setComponents(history[newIndex]);
      setHistoryIndex(newIndex);
    }
  };

  return (
    <VStack
      bg="gray.100"
      w="20%"
      p="4"
      spacing="4"
      overflowY="auto"
      h="100vh"
      alignItems="start"
    >
      <Box
        draggable
        onDragStart={(e) => handleDragStart(e, 'rectangle')}
        p="4"
        bg="white"
        borderRadius="md"
        shadow="md"
        w="full"
        textAlign="center"
      >
        <Icon as={FiSquare} boxSize="6" color="black" />
        <Box>Rectangle</Box>
      </Box>
      <Box
        draggable
        onDragStart={(e) => handleDragStart(e, 'line')}
        p="4"
        bg="white"
        borderRadius="md"
        shadow="md"
        w="full"
        textAlign="center"
      >
        <Icon as={FiMinus} boxSize="6" color="black" />
        <Box>Line</Box>
      </Box>
      <Box
        draggable
        onDragStart={(e) => handleDragStart(e, 'verticalLine')}
        p="4"
        bg="white"
        borderRadius="md"
        shadow="md"
        w="full"
        textAlign="center"
      >
        <Box h="50px" w="4px" bg="black" />
        <Box>Vertical Line</Box>
      </Box>
      <Box
        draggable
        onDragStart={(e) => handleDragStart(e, 'cross')}
        p="4"
        bg="white"
        borderRadius="md"
        shadow="md"
        w="full"
        textAlign="center"
      >
        <Icon as={FiPlus} boxSize="6" color="black" />
        <Box>Cross</Box>
      </Box>
      <Box
        draggable
        onDragStart={(e) => handleDragStart(e, 'leftArrow')}
        p="4"
        bg="white"
        borderRadius="md"
        shadow="md"
        w="full"
        textAlign="center"
      >
        <Icon as={FiArrowLeft} boxSize="6" color="black" />
        <Box>Left Arrow</Box>
      </Box>
      <Box
        draggable
        onDragStart={(e) => handleDragStart(e, 'rightArrow')}
        p="4"
        bg="white"
        borderRadius="md"
        shadow="md"
        w="full"
        textAlign="center"
      >
        <Icon as={FiArrowRight} boxSize="6" color="black" />
        <Box>Right Arrow</Box>
      </Box>
      <Box
        draggable
        onDragStart={(e) => handleDragStart(e, 'text')}
        p="4"
        bg="white"
        borderRadius="md"
        shadow="md"
        w="full"
        textAlign="center"
      >
        <Icon as={FiType} boxSize="6" color="black" />
        <Box>Text</Box>
      </Box>
      <Button onClick={saveWireframe} leftIcon={<FiSave />} colorScheme="green">
        Save
      </Button>
      <Input type="file" accept=".json" onChange={loadWireframe} />
      <Button onClick={undo} colorScheme="blue">
        Undo
      </Button>
      <Button onClick={redo} colorScheme="blue">
        Redo
      </Button>
    </VStack>
  );
};

export default Toolbar;
