import { Flex, Text, Stack} from '@chakra-ui/react';

function StatusBox ({bgColor, status, number, color}) {
	return (
		<Flex 
		rounded={10} 
		bgColor={bgColor} 
		p={'1'}
		px={'4'}
		minW={'90px'}
		color={color} 
		direction={'column'}>
			<Text>{status}</Text>
			<Flex justify={'center'}>
				<Text fontSize={'5xl'}>{number}</Text>
			</Flex>
		</Flex>
	)
}

function ResultBox ({result, onLoading}) {
	return (
		<Flex
		boxShadow={'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'}
		p={'4'}
		rounded={'15'}
		fontSize={'sm'}
		fontWeight={'semibold'}
		color={'blackAlpha.600'}
		>
			{onLoading ? <Text>Processing... Please wait</Text> :
			<Stack w={'100%'}>
				<Text fontSize='xl'>
					Total {result[0]} Websites
				</Text>
				<Text>
					{result[3] && ('Used ' + result[3])}
				</Text>
				<Flex>
					<Flex w={'50%'} justify={'center'}>
						<StatusBox 
						bgColor={'#4AE46D'}
						status={'UP'}
						color={'white'}
						number={result[1]}
						/>
					</Flex>
					<Flex w={'50%'} justify={'center'}>
						<StatusBox 
						bgColor={'#EBEBEC'}
						status={'DOWN'}
						color={'blackAlpha.600'}
						number={result[2]}
						/>
					</Flex>
				</Flex>
			</Stack>
			}
		</Flex>
	)
}

export default ResultBox;