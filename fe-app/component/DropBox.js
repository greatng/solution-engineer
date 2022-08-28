import { Flex, Text, Image, Button } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

function UploadButton({getInputProps, open}) {
	return (
		<form>
		<input
		{...getInputProps()}
		/>
		<Button
		bgColor={'#6649F5'} 
		rounded={'5'} 
		px={'6'} 
		py={'2'} 
		onClick={open}
		_hover= {{
			bgColor: '#CFD2FC' 
		}}
		>
			<Text color={'white'} fontWeight={'bold'}>
				Browse File
			</Text>
		</Button>
		</form>
	)
}

function DropBox (
	{
		setShowProgress, 
		setShowResult, 
		setFilename, 
		setPercent, 
		setResult,
		setOnLoading,
		onLoading,
		setRemainTime,
	}) {

	let res;
	const {acceptedFiles, getRootProps, open, getInputProps} = useDropzone({
		noClick: true,
		maxFiles: 1,
		multiple: false,
		accept: {
			'text/csv': ['.csv'],
		},
		});

	useEffect(() => {
		if (acceptedFiles.length > 0) {
			const dateStart = new Date();
			setFilename(acceptedFiles[0].name);
			setShowProgress(true);
			setShowResult(false);
			const data = new FormData();
			data.append('file', acceptedFiles[0]);
			const fetchData = async () => {
				try {
					res = await axios({
					method: 'post',
					url: process.env.NEXT_PUBLIC_BACKEND_URL,
					data,
					onUploadProgress: (p) => {
						const percentInt = (p.loaded * 100 / p.total).toFixed(2);
						const secondDiff = (Date.now() - dateStart.getTime()) / 1000;
						const timeToFinished = 
						"Finished in " +
						(((100 - percentInt ) / (percentInt / secondDiff)).toFixed(2).toString() + "s ");
						//Above code is just for calculating remaining time
						setRemainTime(timeToFinished);
						setPercent(percentInt);
						if (!onLoading) {
							setOnLoading(true);
							setShowResult(true);
						}
					},
					})
					const resJson = res.data;
					setResult(
						[
							resJson.totalwebsite,
							resJson.up,
							resJson.down,
							resJson.timeelapsed
						]);
					setOnLoading(false);
					setShowProgress(false);
				}
				catch (err) {
					console.log(err.message);
					setShowResult(false);
					setShowProgress(false);
				}
			};
			fetchData();
		}
	},[acceptedFiles]);

	return (
		<Flex
		{...getRootProps({className: 'dropzone'})}
		maxW={'400'}
		minW={'280'}
		align={'center'}
		direction={'column'}
		p={'4'}
		gap={'4'}
		sx={{
			borderStyle: 'dashed',
			borderRadius: 25,
			borderWidth: 4,
			borderColor: '#D6DBE7',
			backgroundColor: '#F5F7FC',
		}}
		>
			<Image src='/img/csv.png' maxH={'8vh'}/>
			<Text fontWeight={'semibold'}>
				Drag your .csv file here to start uploading.
			</Text>
			<Text fontWeight={'semibold'} color={'#CCCCCC'}>
			─── OR ───
			</Text>
			<UploadButton 
				getInputProps={getInputProps}
				open={open}
			/>
		</Flex>
	)
}

export default DropBox;