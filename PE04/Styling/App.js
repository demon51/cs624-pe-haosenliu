import React, { Component } from 'react';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import { Platform, Image, StyleSheet, Text, View, TouchableHighlight } from 'react-native';

const userImage = require('./assets/user.png');

const data = Array(6).fill({
  image: userImage,
  name: 'Haosen Liu',
  occupation: 'React Native Developer',
  description: 'Haosen is a really great Javascript developer. ' +
               'He loves using JS to build React Native applications ' +
               'for iOS and Android',
  showThumbnail: true
});

const ProfileCard = ({ image, name, occupation, description, onPress, showThumbnail }) => {
  let containerStyles = [styles.cardContainer];
  let imageStyles = [styles.cardImage];
  let nameStyles = [styles.cardName];
  let occupationStyles = [styles.cardOccupation];
  let descriptionStyles = [styles.cardDescription];

  if (showThumbnail) {
    containerStyles.push(styles.cardThumbnail);
    imageStyles.push(styles.imageThumbnail);
    nameStyles.push(styles.textThumbnail);
    occupationStyles.push(styles.textThumbnail);
    descriptionStyles.push(styles.textThumbnail);
  }

  return (
    <TouchableHighlight onPress={onPress}>
      <View style={containerStyles}>
        <View style={[styles.cardImageContainer, showThumbnail && styles.imageContainerThumbnail]}>
          <Image style={imageStyles} source={image} />
        </View>
        <Text style={nameStyles}>{name}</Text>
        <View style={styles.cardOccupationContainer}>
          <Text style={occupationStyles}>{occupation}</Text>
        </View>
        <Text style={descriptionStyles}>{description}</Text>
      </View>
    </TouchableHighlight>
  );
};

ProfileCard.propTypes = {
  image: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  occupation: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  showThumbnail: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: data
    };
  }

  handleProfileCardPress = (index) => {
    const newData = update(this.state.data, {
      [index]: {
        showThumbnail: { $set: !this.state.data[index].showThumbnail }
      }
    });
    this.setState({ data: newData });
  };

  render() {
    const list = this.state.data.map((item, index) => {
      return (
        <ProfileCard
          key={'card-' + index}
          image={item.image}
          name={item.name}
          occupation={item.occupation}
          description={item.description}
          onPress={() => this.handleProfileCardPress(index)}
          showThumbnail={item.showThumbnail}
        />
      );
    });

    return <View style={styles.container}>{list}</View>;
  }
}

const profileCardColor = 'dodgerblue';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 3,
    borderRadius: 20,
    backgroundColor: profileCardColor,
    width: 150,
    height: 250,
    margin: 20,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: 10 },
        shadowOpacity: 1
      },
      android: {
        elevation: 15
      }
    }),
  },
  cardThumbnail: {
    width: 100, // Adjusted for thumbnail size
    height: 180, // Adjusted for thumbnail size
  },
  cardImageContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 3,
    borderColor: 'black',
    width: 60,
    height: 60,
    borderRadius: 60,
    marginTop: 20,
    paddingTop: 5,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: 10 },
        shadowOpacity: 1
      },
      android: {
        elevation: 15
      }
    }),
  },
  imageContainerThumbnail: {
    width: 60, // Adjusted for thumbnail size
    height: 60, // Adjusted for thumbnail size
    borderRadius: 30, // Adjusted for thumbnail size
    marginTop: 5, // Adjusted for thumbnail size
  },
  cardImage: {
    width: 45,
    height: 45
  },
  imageThumbnail: {
    width: 40, // Adjusted for thumbnail size
    height: 40, // Adjusted for thumbnail size
  },
  cardName: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 8,
    marginTop: 15,
    textShadowColor: 'black',
    textShadowOffset: {
      height: 2,
      width: 2
    },
    textShadowRadius: 3
  },
  textThumbnail: {
    fontSize: 5, // Adjusted for thumbnail size
    textShadowOffset: {
      height: 1,
      width: 1
    },
    textShadowRadius: 1
  },
  cardOccupationContainer: {
    borderColor: 'black',
    borderBottomWidth: 1
  },
  cardOccupation: {
    fontSize: 6,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  cardDescription: {
    fontSize: 6,
    fontStyle: 'italic',
    marginTop: 5,
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 10
  }
});
