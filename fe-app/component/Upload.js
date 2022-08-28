import {  Box, Stack, Text } from '@chakra-ui/react';
import { useState } from 'react';
import DropBox from './DropBox';
import ProgressBar from './ProgressBar';
import ResultBox from './ResultBox';

function Upload () {
	const [ showProgress, setShowProgress ] = useState(false);
	const [ showResult, setShowResult ] = useState(false);
	const [ result, setResult ] = useState()
	const [ percent, setPercent ] = useState(0);
	const [ filename, setFilename ] = useState('');
	const [ onLoading, setOnLoading ] = useState(false);
	const [ remainTime, setRemainTime ] = useState();

	return (
		<Stack color={'#7D7D7D'} fontSize={'large'} spacing={'4'}>
			<Text fontWeight={'semibold'}>
				Websites Checker
			</Text>
			<DropBox
			setShowProgress={setShowProgress}
			setShowResult={setShowResult}
			setFilename={setFilename}
			setPercent={setPercent}
			setResult={setResult}
			setOnLoading={setOnLoading}
			onLoading={onLoading}
			setRemainTime={setRemainTime}
			/>
			<Box p={'2'}></Box>
			{showProgress && 
				<ProgressBar 
				filename={filename}
				percent={percent}
				remainTime={remainTime}
				/>
			}
			{showResult && 
			<ResultBox 
			result={result} 
			onLoading={onLoading}
			>
			</ResultBox>}
		</Stack>
	)

}

export default Upload;