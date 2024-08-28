import React from 'react';
import { VStack, Box, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Input, Button } from '@chakra-ui/react';
import { FiTrash } from 'react-icons/fi';

const Properties = ({
  component,
  components,
  selectedComponentIndex,
  setComponents,
  saveHistory,
  onDeleteComponent,
}) => {
  const handleStyleChange = (key, value) => {
    const updatedComponents = [...components];
    updatedComponents[selectedComponentIndex].style[key] = value;
    setComponents(updatedComponents);
    saveHistory(updatedComponents);
  };

  return (
    <VStack bg="gray.100" w="20%" p="4" spacing="4" overflowY="auto" h="100vh">
      {component.type === 'rectangle' && (
        <>
          <Box>
            <label>Background Color:</label>
            <Input
              type="color"
              onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
              value={component.style.backgroundColor}
            />
          </Box>
          <Box>
            <label>Border Color:</label>
            <Input
              type="color"
              onChange={(e) => handleStyleChange('borderColor', e.target.value)}
              value={component.style.borderColor}
            />
          </Box>
          <Box>
            <label>Border Width:</label>
            <Slider
              defaultValue={2}
              min={0}
              max={10}
              step={1}
              onChange={(val) => handleStyleChange('borderWidth', `${val}px`)}
              value={parseInt(component.style.borderWidth)}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </Box>
          <Box>
            <label>Border Radius:</label>
            <Slider
              defaultValue={0}
              min={0}
              max={50}
              step={1}
              onChange={(val) => handleStyleChange('borderRadius', `${val}px`)}
              value={parseInt(component.style.borderRadius)}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </Box>
          <Box>
            <label>Opacity:</label>
            <Slider
              defaultValue={1}
              min={0}
              max={1}
              step={0.1}
              onChange={(val) => handleStyleChange('opacity', val)}
              value={component.style.opacity}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </Box>
        </>
      )}
      {component.type === 'text' && (
        <>
          <Box>
            <label>Font Color:</label>
            <Input
              type="color"
              onChange={(e) => handleStyleChange('color', e.target.value)}
              value={component.style.color}
            />
          </Box>
          <Box>
            <label>Font Size:</label>
            <Slider
              defaultValue={16}
              min={8}
              max={36}
              step={1}
              onChange={(val) => handleStyleChange('fontSize', `${val}px`)}
              value={parseInt(component.style.fontSize)}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </Box>
        </>
      )}
      <Button colorScheme="red" onClick={onDeleteComponent} leftIcon={<FiTrash />}>
        Delete
      </Button>
    </VStack>
  );
};

export default Properties;
