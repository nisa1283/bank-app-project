import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

const { width, height } = Dimensions.get('window');

interface MainScreenProps {
  children: React.ReactNode;
  showHeader?: boolean;
  title?: string;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  titleStyle?: object;
}

const MainScreen: React.FC<MainScreenProps> = ({
  children,
  showHeader = true,
  title,
  onLeftPress,
  onRightPress,
  leftIcon,
  rightIcon,
  titleStyle,
}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        {showHeader && (
          <View style={styles.header}>
            <TouchableOpacity onPress={onLeftPress} style={styles.sideIcon}>
              {leftIcon}
            </TouchableOpacity>

            <Text style={[styles.title, titleStyle]} numberOfLines={1}>
              {title || ''}
            </Text>

            <TouchableOpacity onPress={onRightPress} style={styles.sideIcon}>
              {rightIcon}
            </TouchableOpacity>
          </View>
        )}

        {/* Content */}
        <View style={styles.content}>{children}</View>
      </View>
    </SafeAreaView>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7F4FF',
  },
  container: {
    flex: 1,
    width,
    height,
  },
  header: {
    height: height * 0.08,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
  },
  sideIcon: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  content: {
    flex: 1,
    padding: 8,
  },
});
