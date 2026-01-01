import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native';
import {
  Card,
  Title,
  Paragraph,
  List,
  FAB,
  Portal,
  Dialog,
  Button,
  TextInput,
  Chip,
} from 'react-native-paper';
import { responsiveWidth, responsiveHeight } from '../../utils/responsive';
import { FacilityService } from '../../services/FacilityService';
import { Facility } from '../../types';

const FacilityScreen = ({ route }: any) => {
  const villageId = route?.params?.villageId || 1; // Default village ID
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    fetchFacilities();
  }, []);

  const fetchFacilities = async () => {
    setLoading(true);
    try {
      // const res = await FacilityService.getByVillage(villageId);
      // setFacilities(res.data);
      // Dummy data
      setFacilities([
        {
          id: 1,
          name: 'Primary Health Center',
          type: 'Healthcare',
          description: 'Main health facility serving the village',
          villageId: 1,
          status: 'Operational',
        },
        {
          id: 2,
          name: 'Government School',
          type: 'Education',
          description: 'Primary education facility',
          villageId: 1,
          status: 'Operational',
        },
        {
          id: 3,
          name: 'Community Hall',
          type: 'Infrastructure',
          description: 'Village meeting and event space',
          villageId: 1,
          status: 'Under Maintenance',
        },
        {
          id: 4,
          name: 'Water Pump',
          type: 'Water Supply',
          description: 'Main water supply pump',
          villageId: 1,
          status: 'Operational',
        },
      ]);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Operational':
        return '#43A047';
      case 'Under Maintenance':
        return '#FFB300';
      case 'Non-Operational':
        return '#E53935';
      default:
        return '#666';
    }
  };

  const renderFacility = ({ item }: { item: Facility }) => (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.header}>
          <Title style={styles.title}>{item.name}</Title>
          <Chip
            style={{ backgroundColor: getStatusColor(item.status) }}
            textStyle={{ color: '#fff', fontSize: 11 }}
          >
            {item.status}
          </Chip>
        </View>
        <Paragraph style={styles.type}>{item.type}</Paragraph>
        <Paragraph style={styles.description}>{item.description}</Paragraph>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={facilities}
        renderItem={renderFacility}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={fetchFacilities} />
        }
      />

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => setVisible(true)}
        label="Add Facility"
      />

      <Portal>
        <Dialog visible={visible} onDismiss={() => setVisible(false)}>
          <Dialog.Title>Add New Facility</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Facility Name"
              mode="outlined"
              style={styles.dialogInput}
            />
            <TextInput
              label="Type"
              mode="outlined"
              style={styles.dialogInput}
            />
            <TextInput
              label="Description"
              mode="outlined"
              multiline
              numberOfLines={3}
              style={styles.dialogInput}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setVisible(false)}>Cancel</Button>
            <Button
              onPress={() => {
                setVisible(false);
                fetchFacilities();
              }}
            >
              Add
            </Button>
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
  listContent: {
    padding: responsiveWidth(4),
    paddingTop: responsiveHeight(2),
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    flex: 1,
    color: '#1A1A1A',
  },
  type: {
    fontSize: 13,
    color: '#2E7D32',
    fontWeight: '600',
    marginBottom: 6,
  },
  description: {
    color: '#666',
    lineHeight: 20,
    fontSize: 14,
  },
  fab: {
    position: 'absolute',
    margin: 20,
    right: 0,
    bottom: 0,
    backgroundColor: '#8D6E63',
    elevation: 8,
  },
  dialogInput: {
    marginBottom: responsiveHeight(2),
    backgroundColor: '#FAFAFA',
  },
});

export default FacilityScreen;
