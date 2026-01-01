import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native';
import {
  Searchbar,
  Card,
  Title,
  Paragraph,
  List,
  FAB,
  Portal,
  Dialog,
  Button,
  TextInput,
} from 'react-native-paper';
import { responsiveWidth, responsiveHeight } from '../../utils/responsive';
import { VillageService } from '../../services/VillageService';
import { Village } from '../../types';

const VillageListScreen = ({ navigation }: any) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [villages, setVillages] = useState<Village[]>([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    fetchVillages();
  }, []);

  const fetchVillages = async () => {
    setLoading(true);
    try {
      // const res = await VillageService.getAll();
      // setVillages(res.data);
      // Dummy data
      setVillages([
        {
          id: 1,
          name: 'Siddharthnagar',
          district: 'Surat',
          state: 'Gujarat',
          population: 5000,
          description: 'Growing smart village',
        },
        {
          id: 2,
          name: 'Ramapur',
          district: 'Rajkot',
          state: 'Gujarat',
          population: 3500,
          description: 'Traditional agricultural village',
        },
      ]);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const renderVillage = ({ item }: { item: Village }) => (
    <Card
      style={styles.card}
      onPress={() => navigation.navigate('VillageDetails', { village: item })}
    >
      <Card.Content>
        <Title>{item.name}</Title>
        <Paragraph>
          {item.district}, {item.state}
        </Paragraph>
        <List.Item
          title={`Population: ${item.population}`}
          left={props => <List.Icon {...props} icon="account-group" />}
        />
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search Villages"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
      />

      <FlatList
        data={villages}
        renderItem={renderVillage}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={fetchVillages} />
        }
      />

      <FAB icon="plus" style={styles.fab} onPress={() => setVisible(true)} />

      <Portal>
        <Dialog visible={visible} onDismiss={() => setVisible(false)}>
          <Dialog.Title>Add New Village</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Village Name"
              mode="outlined"
              style={styles.dialogInput}
            />
            <TextInput
              label="District"
              mode="outlined"
              style={styles.dialogInput}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setVisible(false)}>Cancel</Button>
            <Button onPress={() => setVisible(false)}>Add</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F0',
  },
  searchBar: {
    margin: responsiveWidth(4),
    marginTop: responsiveHeight(2),
    elevation: 4,
    borderRadius: 12,
  },
  listContent: {
    paddingHorizontal: responsiveWidth(4),
    paddingBottom: responsiveHeight(10),
  },
  card: {
    marginBottom: responsiveHeight(2),
    elevation: 4,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  fab: {
    position: 'absolute',
    margin: 20,
    right: 0,
    bottom: 0,
    backgroundColor: '#2E7D32',
    elevation: 8,
  },
  dialogInput: {
    marginBottom: responsiveHeight(2),
    backgroundColor: '#FAFAFA',
  },
});

export default VillageListScreen;
