import React from 'react';
import { Box } from '@chakra-ui/react';
import { Rnd } from 'react-rnd';

const Canvas = ({ components, setComponents, saveHistory, setSelectedComponentIndex }) => {
  const handleDrop = (e) => {
    e.preventDefault();
    const componentType = e.dataTransfer.getData('component');
    addComponentToCanvas(
      componentType,
      e.clientX - e.target.getBoundingClientRect().left,
      e.clientY - e.target.getBoundingClientRect().top
    );
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const addComponentToCanvas = (type, x, y) => {
    const newComponent = {
      type,
      x,
      y,
      width:
        type.includes('Arrow') || type === 'verticalLine'
          ? 100
          : type === 'line'
          ? 200
          : type === 'cross'
          ? 50
          : 150,
      height:
        type === 'line' || type === 'verticalLine'
          ? 100
          : type === 'cross'
          ? 50
          : type.includes('Arrow')
          ? 20
          : 100,
      style: {
        backgroundColor: type === 'rectangle' ? '#gray.200' : 'transparent',
        borderColor: type === 'rectangle' ? 'black' : 'none',
        borderWidth: '2px',
        borderRadius: '0px',
        opacity: 1,
        color: '#000000',
        fontSize: '16px',
      },
    };
    const updatedComponents = [...components, newComponent];
    setComponents(updatedComponents);
    saveHistory(updatedComponents);
  };

  const handleComponentClick = (index) => {
    setSelectedComponentIndex(index);
  };

  return (
    <Box
      w="60%"
      h="100vh"
      bg="gray.50"
      border="1px solid"
      borderColor="gray.200"
      position="relative"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      {components.map((component, index) => (
        <Rnd
          key={index}
          bounds="parent"
          size={{ width: component.width, height: component.height }}
          position={{ x: component.x, y: component.y }}
          onDragStop={(e, d) => {
            const updatedComponents = [...components];
            updatedComponents[index] = { ...updatedComponents[index], x: d.x, y: d.y };
            setComponents(updatedComponents);
            saveHistory(updatedComponents);
          }}
          onResizeStop={(e, direction, ref, delta, position) => {
            const updatedComponents = [...components];
            updatedComponents[index] = {
              ...updatedComponents[index],
              width: ref.style.width,
              height: ref.style.height,
              ...position,
            };
            setComponents(updatedComponents);
            saveHistory(updatedComponents);
          }}
          onClick={() => handleComponentClick(index)}
          style={{ border: 'none', cursor: 'pointer', outline: component.type === 'rectangle' ? `2px solid ${component.style.borderColor}` : 'none' }}
        >
          {component.type === 'rectangle' && (
            <Box
              bg={component.style.backgroundColor}
              borderColor={component.style.borderColor}
              borderWidth={component.style.borderWidth}
              borderRadius={component.style.borderRadius}
              opacity={component.style.opacity}
              w="100%"
              h="100%"
            />
          )}
          {component.type === 'line' && (
            <Box
              bg="black"
              height="2px"
              width="100%"
              style={{ backgroundColor: 'black', border: 'none' }}
            />
          )}
          {component.type === 'verticalLine' && (
            <Box
              bg="black"
              width="2px"
              height="100%"
              style={{ backgroundColor: 'black', border: 'none' }}
            />
          )}
          {component.type === 'cross' && (
            <Box position="relative" width="100%" height="100%">
              <Box
                bg="black"
                height="2px"
                width="100%"
                position="absolute"
                top="50%"
                left="0"
                transform="translateY(-50%)"
              />
              <Box
                bg="black"
                width="2px"
                height="100%"
                position="absolute"
                top="0"
                left="50%"
                transform="translateX(-50%)"
              />
            </Box>
          )}
          {component.type === 'leftArrow' && (
            <Box
              width="0"
              height="0"
              borderTop="10px solid transparent"
              borderBottom="10px solid transparent"
              borderRight="20px solid black"
            />
          )}
          {component.type === 'rightArrow' && (
            <Box
              width="0"
              height="0"
              borderTop="10px solid transparent"
              borderBottom="10px solid transparent"
              borderLeft="20px solid black"
            />
          )}
          {component.type === 'text' && (
            <div
              contentEditable="true"
              style={{
                fontSize: component.style.fontSize,
                color: component.style.color,
                textAlign: 'left',
                whiteSpace: 'nowrap',
              }}
            >
              Editable Text
            </div>
          )}
        </Rnd>
      ))}
    </Box>
  );
};

export default Canvas;
