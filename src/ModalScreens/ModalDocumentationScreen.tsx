import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, LogBox, Image } from 'react-native';
import Markdown from 'react-native-markdown-display';
import { useNavigation } from '@react-navigation/native';
import gStyles from '../styles/styles';
import { markdownStyles } from '../tools/MarkdownStyles';
import ServiceAPI, { DocAPI } from '../ServiceAPI';

const ModalDocumentationScreen = () => {
  const [markdownContent, setMarkdownContent] = React.useState('');
  const [currentSegment, setCurrentSegment] = React.useState('/Overview');

  const navigation = useNavigation();

  const fetchDocumentation = async (segment = currentSegment) => {
    const markdownContent = await ServiceAPI.getDocumentation(segment + '/README.md');
    setMarkdownContent(markdownContent);
  };

  React.useEffect(() => {
    fetchDocumentation();
  }, []);

  LogBox.ignoreLogs(['No Activity found to handle intent']);

  const handleLinkPress = (url: string) => {
    if (url.startsWith('./')) {
      const segments = url.replace(/^\.\//, '').split('/');
      segments.pop();
      const cleanSegment = '/' + segments.join('/');
      setCurrentSegment(cleanSegment);
      fetchDocumentation(cleanSegment);
    }
    return true;
  };

  const renderImage = (node: any) => {
    const { src } = node.attributes;
    const uri = src.startsWith('.')
      ? `${DocAPI + currentSegment + '/' + src.replace(/^\.\//, '')}`
      : src;

    return <Image source={{ uri }} style={styles.image} key={src} />;
  };

  const markdownRules = {
    image: renderImage,
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={gStyles.modalHeaderBar} onPress={() => navigation.goBack()}>
        <Text style={gStyles.modalHeaderBar_text}>❮</Text>
        <Text style={gStyles.modalHeaderBar_text}>Documentation</Text>
      </TouchableOpacity>

      <ScrollView style={styles.scrollView}>
        <Markdown
          style={markdownStyles}
          onLinkPress={handleLinkPress}
          rules={markdownRules}
        >
          {markdownContent}
        </Markdown>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  scrollView: {
    paddingHorizontal: 20,
  },
  image: {
    flex: 1,
    width: '100%',
    height: 180,
    borderWidth: 2,
    borderColor: 'white'
  },
});

export default ModalDocumentationScreen;
