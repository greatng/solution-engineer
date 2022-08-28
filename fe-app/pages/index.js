import Head from 'next/head'
import { Container, Flex } from '@chakra-ui/react'
import Upload from '../component/Upload'

export default function Home() {
return (
	<>
	<Head>
		<title>Web Checker</title>
		<meta name="description" content="Line Solution Engineer" />
		<link rel="icon" href="/favicon.ico" />
	</Head>
	<Container>
		<Flex pos={'relative'} top={'10vh'} justify={'center'}>
			<Upload></Upload>
		</Flex>
	</Container>
	</>
)
}
