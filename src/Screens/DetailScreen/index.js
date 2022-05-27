import React, { useState, useLayoutEffect, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, FlatList, Modal, ScrollView, Dimensions, Image,PermissionsAndroid,Platform } from 'react-native';
// import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import style from './style';
import Loader from '../../Component/Loader';
import NoDataAvailable from '../../Component/NoDataAvailable';
import { isNull } from '../../Utils';
import { GetHomeUrl } from '../../Api/Webservices';
import { onCallget } from '../../Api/Webservices/ApiHelper'
import DetailsViewCell from '../../Component/CellView/DetailsViewCell'
import FlatListRefreshView from '../../Component/FlatListRefreshView';
import SearchView from '../../Component/SearchView'
import { IMAGE, STRINGS } from '../../constants';
import ViewShot from "react-native-view-shot";
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
import FastImage from 'react-native-fast-image';
import RNImageToPdf from 'react-native-image-to-pdf';
import RNFetchBlob from 'rn-fetch-blob';
const DetailScreen = ({ navigation, route }) => {

    const [Visible, setVisible] = useState(false);
    const [pockeLoader, setPockeLoader] = useState(false);

    const [status, setstatus] = React.useState(false);
    const [Data, setData] = useState([]);
    const [Error, setError] = useState("");
    const [NextUrl, setNextUrl] = useState("");
    const [isRefreshpage, setisRefreshpage] = useState(false);
    const [search, setSearch] = useState("");
    const [searchData, setSearchData] = useState([]);
    const [pokemonDetail, setPokemonDetail] = useState(null);
    const [modalOpen, setModalopen] = useState(false)
    const [selectedPokemon, setSelectedPokemon] = useState("");
    const [GraphData, setGraphData] = useState([])
    const viewShotRef = useRef(null);
    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => "#000000",
        // color:"#FFFFFF",
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.9,
        useShadowColorFromDataset: false // optional
    };

    React.useEffect(() => {
        ApiCall(GetHomeUrl(), true);
    }, []);


    const NoDataAvailableView = () => {
        return (
            <View style={{ height: 150, backgroundColor: 'white', justifyContent: 'center' }}>
                <NoDataAvailable></NoDataAvailable>
            </View>
        )
    }

    const change = (text) => {

        console.log(" hi ", text)
        if (isNull(text) == true) {
            // console.log(" match ")
            let result = Data?.filter((item) => {
                console.log(" match ", item?.name)
                let name = item?.name?.toLowerCase();
                // console.log(" name ",name)
                if (name.includes(text.toLowerCase())) {
                    console.log(" match ", item?.name)
                    return item
                } else {
                    console.log(" no  match ")
                    // return item
                }
            })
            console.log("result---", result?.length)
            setSearchData(result);
        } else {
            setSearchData([])
            console.log(" no  match +--")
        }

    }

    // React.useEffect(() => {
    //     change();
    // }, { search })


    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: props => <SearchView
                change={(text) => {
                    change(text);
                    setSearch(text)
                }}
                title={' test message'}  {...props} />
        })
    }, [search])

    const ApiCall = (url = "", bool = false) => {

        if (bool) {
            setVisible(true)
        }
        onCallget(url, (response) => {
            console.log("response ", response)
            if (response.success === true) {

                if (response?.data?.results?.length > 0) {
                    if (bool == true) {
                        setData(response?.data?.results)
                    } else if (bool == false) {
                        let temp = Data => [...Data, ...response?.data?.results];
                        setData(temp)
                    }

                }
                setNextUrl('')
                if (isNull(response?.data?.next)) {
                    setNextUrl(response?.data?.next);
                }
                setisRefreshpage(false)
            } else {
                if (isNull(response.message) == true) {
                    setError(response.message)
                } else {
                    setError(STRINGS.label_data_some_thing_is_wrong)
                }
            }
            if (bool) {
                setVisible(false)
            }
        })

    }


    useEffect(() => {
        if (selectedPokemon) {
            pokemonDetailApi(selectedPokemon.url)
        }
    }, [selectedPokemon])
    const pokemonDetailApi = (url) => {
        setPockeLoader(true)
        onCallget(url, (response) => {
            if (response.success === true) {
                if (isNull(response?.data) == true) {
                    console.log(response?.data, 'response?.data');
                    setPokemonDetail(response?.data)
                    setModalopen(true)
                    const label = []
                    const data = []
                    response?.data?.stats?.map((item) => {
                        label.push(item?.stat?.name);
                        data.push(item?.base_stat);
                    })
                    const newData = { labels: label, datasets: [{ data: data }] };
                    setGraphData(newData)
                }
            } else {
                if (isNull(response.message) == true) {
                    setError(response.message)
                } else {
                    setError(STRINGS.label_data_some_thing_is_wrong)
                }
            }
            setPockeLoader(false);
        })
    }
    const onCapture = () => {
        viewShotRef.current.capture().then((uri) => {
            console.log('do something with ', uri);
            // myAsyncPDFFunction(uri)
            checkPermission(uri)
        });
    }
    const myAsyncPDFFunction = async (uri) => {
        try {
            const options = {
                imagePaths:  [uri.split('file://').pop()],
            name:  'PDFName',
                quality: .7, // optional compression paramter
            };
            console.log(options);
            const pdf = await RNImageToPdf.createPDFbyImages(options);
            console.log(pdf.filePath);
        } catch(e) {
            console.log(e);
        }
    }

    const _handleDownLoad = async(file) => {
        let date = new Date();
        // File URL which we want to download
        let FILE_URL = file;
        // Function to get extention of the file url
        let file_ext;
    
        file_ext = "." + "pdf";
    
        // config: To get response by passing the downloading related options
        // fs: Root directory path to download
        const { config, fs } = RNFetchBlob;
        
        let RootDir = fs.dirs.DownloadDir;
        let options = {
          fileCache: true,
          addAndroidDownloads: {
            path:
              RootDir +
              "/" +
              "pdfFile",
            description: "downloading file...",
            notification: true,
            // useDownloadManager works with Android only
            useDownloadManager: true,
          },
        };
      };
      const checkPermission = async (uri) => {
        // Function to check the platform
        // If Platform is Android then check for permissions.
    
        if (Platform.OS === "ios") {
          _handleDownLoad(uri);
        } else {
          try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
              {
                buttonPositive:'',
                title: "Storage Permission Required",
                message:
                  "Application needs access to your storage to download File",
              }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              // Start downloading
              _handleDownLoad(uri);
              console.log("Storage Permission Granted.");
            } else {
              // If permission denied then show alert
              Alert.alert("Error", "Storage Permission Not Granted");
            }
          } catch (err) {
            // To handle permission related exception
            console.log("++++" + err);
          }
        }
      };

    return (

        <View style={style.MainView}>

            <Loader visible={Visible}></Loader>
            <Loader visible={pockeLoader}></Loader>
            {
                Data?.length > 0 && Visible == false && isNull(search) == false &&
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    maxToRenderPerBatch={40}
                    style={{ flex: 1,  }}
                    keyExtractor={(item, index) => { return index.toString() + item?.name }}
                    ListFooterComponent={isRefreshpage == true ? (<FlatListRefreshView></FlatListRefreshView>) : null}
                    onEndReachedThreshold={1}
                    onEndReached={(distance) => {
                        if (isNull(NextUrl) == true && isRefreshpage == false && searchData?.length == 0) {
                            setisRefreshpage(true)
                            ApiCall(NextUrl, false)
                        }
                    }}
                    extraData={searchData?.length > 0 ? searchData : Data}
                    data={searchData?.length > 0 ? searchData : Data}
                    renderItem={({ item, index }) => {
                        return (<DetailsViewCell
                            onClick={(item) => {
                                setSelectedPokemon(item)

                            }}
                            item={item}></DetailsViewCell>)
                    }}
                >

                </FlatList>
            }
            {
                searchData?.length > 0 && Visible == false &&
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    maxToRenderPerBatch={40}
                    style={{ flex: 1, backgroundColor: 'white' }}
                    keyExtractor={(item, index) => { return index.toString() + item?.name }}
                    ListFooterComponent={isRefreshpage == true ? (<FlatListRefreshView></FlatListRefreshView>) : null}
                    onEndReachedThreshold={1}
                    extraData={searchData}
                    data={searchData}
                    renderItem={({ item, index }) => {
                        return (<DetailsViewCell
                            onClick={(item) => {
                                setSelectedPokemon(item)
                            }}
                            item={item}></DetailsViewCell>)
                    }}
                >

                </FlatList>
            }

            {
                Visible == false && Data.length === 0 &&
                <NoDataAvailableView />


            }

            {
                Visible == false && searchData.length === 0 && isNull(search) == true &&
                <NoDataAvailableView>

                </NoDataAvailableView>
            }
            {modalOpen && (
                <Modal
                    visible={modalOpen}
                    onRequestClose={() => {
                        setModalopen(false)
                        setPokemonDetail(null);
                        setSelectedPokemon("")
                    }}
                    transparent={true}
                    style={{ alignItems: 'center', justifyContent: 'center' }}
                >

                    <TouchableOpacity activeOpacity={0.5} onPress={() => { setModalopen(false), setPokemonDetail(null), setSelectedPokemon(""); }} style={{ height: '100%',flex:1, width: '100%', backgroundColor: 'rgba(0,0,0,0.8)', position: 'absolute',zIndex:0 }}></TouchableOpacity>

                    <View style={{ backgroundColor: 'white', height: '90%', width: '95%', alignSelf: 'center', marginVertical: 35, borderRadius: 20, overflow: 'hidden' }}>
                        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 30 }}>
                            <ViewShot ref={viewShotRef} options={{ format: 'jpg', quality: 0.9 }}>
                                <View style={{ flex: 1 }}>
                                    <View style={style.headerView}>
                                        <Text style={style.headerText}>{pokemonDetail?.name}</Text>
                                    </View>
                                    {
                                        isNull(pokemonDetail?.sprites?.front_default) == true &&
                                        <FastImage
                                            source={{ uri: pokemonDetail?.sprites?.front_default }}
                                            style={style.fastImageVIewStyle}>

                                        </FastImage>
                                    }
                                    {
                                        pokemonDetail?.stats?.length > 0 &&
                                        <FlatList
                                            showsHorizontalScrollIndicator={false}
                                            showsVerticalScrollIndicator={false}
                                            maxToRenderPerBatch={40}
                                            style={{ flex: 1, backgroundColor: 'white' }}
                                            keyExtractor={(item, index) => { return index.toString() + item?.name }}
                                            extraData={pokemonDetail?.stats}
                                            data={pokemonDetail?.stats}
                                            renderItem={({ item, index }) => {
                                                return (
                                                    <View style={{ paddingVertical: 10, marginHorizontal: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderWidth: 0.5 }}>
                                                        <Text style={style.textstyleName}>{item?.stat?.name}</Text>
                                                        <Text style={style.textstyleName}>{item?.base_stat}</Text>
                                                    </View>
                                                )
                                            }}
                                        >
                                        </FlatList>
                                    }

                                    {
                                        GraphData?.labels?.length > 0 &&
                                        <BarChart
                                            style={style.graphStyle}
                                            data={GraphData}
                                            width={Dimensions.get('screen').width - 40}
                                            height={300}
                                            chartConfig={chartConfig}
                                            verticalLabelRotation={30}
                                        />
                                    }


                                </View>
                            </ViewShot>
                        </ScrollView>
                        <TouchableOpacity onPress={() => onCapture()} style={style.downloadBtn}>
                            <Image source={IMAGE.DOWNLOADIMAGE} style={style.downloadImage} />
                        </TouchableOpacity>
                    </View>

                </Modal>
            )}

        </View>
    )
}


export default DetailScreen;
