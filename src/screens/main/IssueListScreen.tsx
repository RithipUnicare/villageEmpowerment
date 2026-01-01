import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import {
  List,
  Chip,
  Title,
  FAB,
  Portal,
  Dialog,
  Button,
  TextInput,
} from 'react-native-paper';
import { responsiveWidth, responsiveHeight } from '../../utils/responsive';
import { Issue } from '../../types';

const IssueListScreen = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Dummy Data
    setIssues([
      {
        id: 1,
        title: 'Road Damage',
        description: 'Heavy rains caused cracks',
        status: 'PENDING',
        priority: 'HIGH',
        villageId: 1,
        reporterId: 1,
        createdAt: '2025-12-25',
      },
      {
        id: 2,
        title: 'Borewell Repair',
        description: 'Pump motor not working',
        status: 'IN_PROGRESS',
        priority: 'MEDIUM',
        villageId: 1,
        reporterId: 1,
        createdAt: '2025-12-28',
      },
    ]);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return '#E53935';
      case 'IN_PROGRESS':
        return '#FFB300';
      case 'RESOLVED':
        return '#43A047';
      default:
        return '#666';
    }
  };

  const renderIssue = ({ item }: { item: Issue }) => (
    <List.Item
      title={item.title}
      description={item.description}
      left={props => (
        <List.Icon
          {...props}
          icon="alert-circle"
          color={getStatusColor(item.status)}
        />
      )}
      right={() => (
        <View style={styles.rightContainer}>
          <Chip
            style={{ backgroundColor: getStatusColor(item.status) }}
            textStyle={{ color: '#fff' }}
          >
            {item.status}
          </Chip>
        </View>
      )}
      style={styles.listItem}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={issues}
        renderItem={renderIssue}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContent}
      />

      <FAB
        icon="alert-plus"
        style={styles.fab}
        onPress={() => setVisible(true)}
        label="Report Issue"
      />

      <Portal>
        <Dialog visible={visible} onDismiss={() => setVisible(false)}>
          <Dialog.Title>Report New Issue</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Title"
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
            <Button onPress={() => setVisible(false)}>Submit</Button>
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
  },
  listItem: {
    backgroundColor: '#FFFFFF',
    marginBottom: 12,
    borderRadius: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    paddingVertical: 8,
  },
  rightContainer: {
    justifyContent: 'center',
    paddingRight: 8,
  },
  fab: {
    position: 'absolute',
    margin: 20,
    right: 0,
    bottom: 0,
    backgroundColor: '#E53935',
    elevation: 8,
  },
  dialogInput: {
    marginBottom: responsiveHeight(2),
    backgroundColor: '#FAFAFA',
  },
});

export default IssueListScreen;
