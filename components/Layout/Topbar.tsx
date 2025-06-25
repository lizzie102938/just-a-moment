import { Flex, Switch } from '@mantine/core';
import Badge from '@/components/Badge'; // Adjust the import path as needed
import { theme } from '@/lib/theme';

type TopbarProps = {
  onSearch: (query: string) => void;
};

const Topbar = ({ onSearch }: TopbarProps) => {
  return (
    <Flex
      align={'center'}
      pl={16}
      justify={'space-around'}
      h={'6rem'}
      w={'100%'}
      bg={'white'}
    >
      <Badge
        label={'Click somewhere on the map or enter location here:'}
        hasInput={true}
        onSearch={onSearch}
      />
      {/* <Badge label={"See what's there"} /> */}
      {/* <Badge label={'Photos, music, culture'} /> */}
      <Switch label={'Photos'} color={theme.primaryColor} />
      <Switch label={'Food'} color={theme.primaryColor} />
      <Switch label={'Events'} color={theme.primaryColor} />
    </Flex>
  );
};

export default Topbar;
