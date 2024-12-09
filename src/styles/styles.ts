import { StyleSheet } from 'react-native';

const gStyles = StyleSheet.create({
  ScreenContainer_stretch: {
    position: 'relative',
    paddingHorizontal: 10,
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 70,
    backgroundColor: 'black',
  },

  ScreenContainer_start: {
    position: 'relative',
    paddingHorizontal: 10,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: 20,
    backgroundColor: 'black',
  },

  text: {
    color: 'white',
  },

  bigHeader: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },

  separator:
  {
    width: '60%',
    marginVertical: 2,
    borderBottomColor: 'white',
    borderBottomWidth: 5,
  },

  subsectionTitleSeparator_container:
  {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingTop: 20,
    paddingBottom: 6,
    opacity: 0.5,
  },
  subsectionTitleSeparator_line:
  {
    width: '85%',
    borderBottomColor: 'white',
    borderBottomWidth: 3,
  },
  subsectionTitleSeparator_text:
  {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'left',
  },

  modalHeaderBar: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom: 10,
    marginBottom: 16
  },
  modalHeaderBar_text: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    paddingLeft: 16,
  },

});


export default gStyles;