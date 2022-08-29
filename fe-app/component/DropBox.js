import { Flex, Text, Image, Button } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

function UploadButton({ getInputProps, open }) {
    return (
        <form>
            <input {...getInputProps()} />
            <Button
                bgColor={'#6649F5'}
                rounded={'5'}
                px={'6'}
                py={'2'}
                onClick={open}
                _hover={{
                    bgColor: '#CFD2FC',
                }}
            >
                <Text color={'white'} fontWeight={'bold'}>
                    Browse File
                </Text>
            </Button>
        </form>
    );
}

function DropBox({ setState, state }) {
    let res;
    const { acceptedFiles, getRootProps, open, getInputProps } = useDropzone({
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
            setState((prev) => {
                return {
                    ...prev,
                    showprogress: true,
                    showresult: false,
                    filename: acceptedFiles[0].name,
                };
            });
            const data = new FormData();
            data.append('file', acceptedFiles[0]);
            const fetchData = async () => {
                try {
                    res = await axios({
                        method: 'post',
                        url: process.env.NEXT_PUBLIC_BACKEND_URL,
                        data,
                        onUploadProgress: (p) => {
                            const percentInt = (
                                (p.loaded * 100) /
                                p.total
                            ).toFixed(2);
                            const secondDiff =
                                (Date.now() - dateStart.getTime()) / 1000;
                            const timeToFinished = (
                                (100 - percentInt) /
                                (percentInt / secondDiff)
                            )
                                .toFixed(2)
                                .toString();
                            //Above code is just for calculating remaining time
                            setState((prev) => {
                                return {
                                    ...prev,
                                    remaintime: timeToFinished,
                                    percent: percentInt,
                                };
                            });
                            if (!state.onloading) {
                                setState((prev) => {
                                    return {
                                        ...prev,
                                        onloading: true,
                                        showresult: true,
                                    };
                                });
                            }
                        },
                    });
                    const resJson = res.data;
                    setState((prev) => {
                        return {
                            ...prev,
                            onloading: false,
                            showresult: true,
                            total: resJson.totalwebsite,
                            up: resJson.up,
                            down: resJson.down,
                            timeelapsed: resJson.timeelapsed,
                        };
                    });
                } catch (err) {
                    setState((prev) => {
                        return {
                            ...prev,
                            showprogress: false,
                            showresult: false,
                        };
                    });
                    console.log(err.message);
                }
            };
            fetchData();
        }
    }, [acceptedFiles]);

    return (
        <Flex
            {...getRootProps({ className: 'dropzone' })}
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
            <Image src="/img/csv.png" maxH={'8vh'} />
            <Text fontWeight={'semibold'}>
                Drag your .csv file here to start uploading.
            </Text>
            <Text fontWeight={'semibold'} color={'#CCCCCC'}>
                ─── OR ───
            </Text>
            <UploadButton getInputProps={getInputProps} open={open} />
        </Flex>
    );
}

export default DropBox;
