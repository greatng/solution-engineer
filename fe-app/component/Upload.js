import { Box, Stack, Text } from '@chakra-ui/react';
import { useState } from 'react';
import DropBox from './DropBox';
import ProgressBar from './ProgressBar';
import ResultBox from './ResultBox';

function Upload() {
    const initialized = {
        showprogress: false,
        showresult: false,
        onloading: false,
        filename: '',
        remaintime: 0,
        percent: 0,
        total: 0,
        up: 0,
        down: 0,
        timeelapsed: 0,
    };

    const [state, setState] = useState(initialized);

    return (
        <Stack color={'#7D7D7D'} fontSize={'large'} spacing={'4'}>
            <Text fontWeight={'semibold'}>Websites Checker</Text>
            <DropBox setState={setState} state={state} />
            <Box p={'2'}></Box>
            {state.showprogress && <ProgressBar state={state} />}
            {state.showresult && <ResultBox state={state}></ResultBox>}
        </Stack>
    );
}

export default Upload;
