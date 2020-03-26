import tron from 'reactotron-react-native';

import React from 'react';

import {
  View,
  Text,
  SafeAreaView,
  ScrollView
} from 'react-native';

import {
  List,
  TouchableRipple,
  IconButton,
  Button
} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '../utils/api';
import storage from '../utils/storage';

import EventCard from '../components/EventCard/EventCard';

const Home = ({ navigation }) => {
  const [events, setEvents] = React.useState(null);
  const [eventsLoading, setEventsLoading] = React.useState(true);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableRipple>
          <IconButton
            icon="calendar-search"
            color='#fff'
            size={24}
            style={{ marginRight: 20 }}
            onPress={() => tron.log('click')}
          />
        </TouchableRipple>
      ),
    });
  }, [navigation]);

  React.useEffect(() => {
    async function getEvents() {
      try {
        const user = await storage.getItem('@user');
        tron.log('user', user)

        const eventList = await api.get(`/events/find-by-study-field/${user.course.studyFieldId}`);
        setEvents(eventList);
        setEventsLoading(false);
      } catch (e) {
        tron.log('[ERROR getEvents()]: ', e);
      }
    }

    getEvents();
  }, []);

  return (
    <SafeAreaView>
      {!eventsLoading &&
        <ScrollView>
          <List.Section style={{ paddingTop: 15, paddingBottom: 15 }}>
            {events.map((event, i) => <EventCard key={i} data={event} />)}
          </List.Section>
        </ScrollView>
      }
    </SafeAreaView>
  );
}

export default Home;
