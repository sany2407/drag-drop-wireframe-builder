import React, { useState } from 'react';
import { ChakraProvider, HStack } from '@chakra-ui/react';
import Toolbar from './Toolbar';
import Canvas from './Canvas';
import Properties from './Properties';

function App() {
  const [components, setComponents] = useState([]);
  const [selectedComponentIndex, setSelectedComponentIndex] = useState(null);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const saveHistory = (newComponents) => {
    const newHistory = [...history.slice(0, historyIndex + 1), newComponents];
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
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

  return (
    <ChakraProvider>
      <HStack h="100vh" spacing="0">
        <Toolbar
          onAddComponent={addComponentToCanvas}
          onSaveHistory={saveHistory}
          setComponents={setComponents}
          setHistoryIndex={setHistoryIndex}
          history={history}
          historyIndex={historyIndex}
          setSelectedComponentIndex={setSelectedComponentIndex}
        />
        <Canvas
          components={components}
          setComponents={setComponents}
          saveHistory={saveHistory}
          setSelectedComponentIndex={setSelectedComponentIndex}
        />
        {selectedComponentIndex !== null && (
          <Properties
            component={components[selectedComponentIndex]}
            components={components}
            selectedComponentIndex={selectedComponentIndex}
            setComponents={setComponents}
            saveHistory={saveHistory}
            onDeleteComponent={() => {
              const updatedComponents = components.filter(
                (_, index) => index !== selectedComponentIndex
              );
              setComponents(updatedComponents);
              saveHistory(updatedComponents);
              setSelectedComponentIndex(null);
            }}
          />
        )}
      </HStack>
    </ChakraProvider>
  );
}

export default App;
