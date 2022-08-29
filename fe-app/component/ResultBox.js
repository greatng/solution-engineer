import { Flex, Text, Stack } from '@chakra-ui/react';
import dayjs from 'dayjs';
var duration = require('dayjs/plugin/duration');

const upProps = {
    status: 'UP',
    bgColor: '#4AE46D',
    color: 'white',
};

const downProps = {
    status: 'DOWN',
    bgColor: '#EBEBEC',
    color: 'blackAlpha.600',
};

function StatusBox({ bgColor, status, number, color }) {
    return (
        <Flex
            rounded={10}
            bgColor={bgColor}
            p={'1'}
            px={'4'}
            minW={'90px'}
            color={color}
            direction={'column'}
        >
            <Text>{status}</Text>
            <Flex justify={'center'}>
                <Text fontSize={'5xl'}>{number}</Text>
            </Flex>
        </Flex>
    );
}

function ResultBox({ state }) {
    dayjs.extend(duration);
    const minutes = dayjs.duration(state.timeelapsed).format('m');
    const seconds = dayjs.duration(state.timeelapsed).format('s');
    return (
        <Flex
            boxShadow={'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'}
            p={'4'}
            rounded={'15'}
            fontSize={'sm'}
            fontWeight={'semibold'}
            color={'blackAlpha.600'}
        >
            {state.onloading ? (
                <Text>Processing... Please wait</Text>
            ) : (
                <Stack w={'100%'}>
                    <Text fontSize="xl">Total {state.total} Websites</Text>
                    <Text>
                        Used{' '}
                        {minutes != '0'
                            ? minutes + ' minute' + seconds + 'second'
                            : seconds + ' second'}
                    </Text>
                    <Flex>
                        <Flex w={'50%'} justify={'center'}>
                            <StatusBox {...upProps} number={state.up} />
                        </Flex>
                        <Flex w={'50%'} justify={'center'}>
                            <StatusBox {...downProps} number={state.down} />
                        </Flex>
                    </Flex>
                </Stack>
            )}
        </Flex>
    );
}

export default ResultBox;
