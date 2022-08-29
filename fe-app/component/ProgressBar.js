import { Flex, Text, Progress, Image } from '@chakra-ui/react';

function ProgressBar({ state }) {
    return (
        <Flex
            boxShadow={'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'}
            p={'4'}
            rounded={'15'}
            fontSize={'sm'}
            fontWeight={'semibold'}
            color={'blackAlpha.400'}
        >
            <Image src="/img/csv.png" maxH={'7vh'} />
            <Flex direction={'column'} w={'100%'} h={'100%'} justify={'center'}>
                <Flex p={'1'}>
                    <Flex w={'90%'} justify={'left'} direction={'column'}>
                        <Text>{state.filename}</Text>
                        <Text>Time remaining {state.remaintime} s</Text>
                    </Flex>
                    <Flex w={'10%'} justify={'end'}>
                        <Text>{state.percent + '%'}</Text>
                    </Flex>
                </Flex>
                <Flex w={'100%'} h={'50%'} align={'end'} p={'1'}>
                    <Progress
                        w={'100%'}
                        sx={{
                            '& > div': {
                                background: '#6649F5',
                            },
                        }}
                        value={state.percent}
                        rounded={'10'}
                        h={'1.8vh'}
                    />
                </Flex>
            </Flex>
        </Flex>
    );
}

export default ProgressBar;
