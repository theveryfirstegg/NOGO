import { View, Text, TouchableOpacity } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useTheme } from '@react-navigation/native'
// eslint-disable-next-line import/no-extraneous-dependencies
import Icons from '@expo/vector-icons/FontAwesome5'
import TicketsScreen from './TicketsScreen'
import settings from '../utils/settings.json'
import styles from './TabScreen.styles'
import UsersScreen from './UsersScreen'

const Tab = createBottomTabNavigator()

function MyTabBar({ state, descriptors, navigation }) {
	const { colors: theme } = useTheme()

	return (
		<View style={styles.container}>
			{state.routes.map((route, index) => {
                
				// MIDDLE TAB
				if(route.name === 'mid') return (
					<View
						key={route.key}
						style={styles.tabMainContainer}
					>
						<>
							<View style={styles.tabMain}>
								<TouchableOpacity
									activeOpacity={0.8}
						            onPress={() => navigation.navigate('Main')}
									style={styles.tabMainInner}>
									<Icons name="car" size={30} color={theme.background} />
								</TouchableOpacity>
							</View>
							<View style={styles.tabMainFiller} />
						</>
					</View>
				)
                
				// OTHER TABS
				const descriptor = descriptors[route.key]
				const badge = descriptor.options.tabBarBadge
				const { options } = descriptor
				const label = options.title || route.name
				const isFocused = state.index === index
				const color = isFocused ? '#fff' : 'rgba(255, 255, 255, 0.4)'
				let iconName
                
				switch (route.name) {
					case 'Tickets':
						iconName = 'list'
						break
					case 'User':
						iconName = 'user-alt'
						break
					default:
						break
				}
  
				const onPress = () => {
					const event = navigation.emit({
						type: 'tabPress',
						target: route.key,
						canPreventDefault: true,
					})
  
					if (!isFocused && !event.defaultPrevented) {
						navigation.navigate({ name: route.name, merge: true })
					}
				}
  
				return (
					<TouchableOpacity
						key={label}
						activeOpacity={1}
						onPress={onPress}
						style={[styles.tab, index === 0 && styles.tabLeft, index === 2 && styles.tabRight]}
					>
						{badge &&
                            <View style={styles.tabBadge}>
                            	<Text style={styles.tabBadgeText}>{badge}</Text>
                            </View>
						}
						<Icons name={iconName} size={22} color={color} />
						<View style={styles.tabTextContainer}>
							<Text style={[styles.tabText, { color }]}>{label}</Text>
						</View>
					</TouchableOpacity>
				)
			})}
		</View>
	)
}

const TabScreen = () => (
	<Tab.Navigator
		screenOptions={settings.screenOptions}
		// eslint-disable-next-line react/no-unstable-nested-components
		tabBar={props => <MyTabBar {...props} />}>
		<Tab.Screen
			name="Tickets"
			component={TicketsScreen}
			options={{ tabBarBadge: 3 }}
		/>
		<Tab.Screen name="mid" component={TicketsScreen} />
		<Tab.Screen
			name="User"
			component={UsersScreen}
			options={{title: 'My Account'}}
		/>
	</Tab.Navigator>
)

export default TabScreen