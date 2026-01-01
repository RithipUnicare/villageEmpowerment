import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
import { IssueService } from '../../services/IssueService';

const IssueListScreen = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('MEDIUM');
  const [villageId, setVillageId] = useState('1');

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    try {
      const res = await IssueService.getMyIssues();
      setIssues(res.data);
    } catch (e) {
      console.error(e);
      // Fallback to dummy data if API fails
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
    }
  };

  const handleCreateIssue = async () => {
    if (!title || !description) {
      return;
    }

    try {
      await IssueService.raise({
        title,
        description,
        priority,
        villageId: parseInt(villageId),
      });
      setVisible(false);
      resetForm();
      fetchIssues();
    } catch (error) {
      console.error('Error creating issue:', error);
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setPriority('MEDIUM');
    setVillageId('1');
  };

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
    <SafeAreaView
      style={{ flex: 1 }}
      edges={['top', 'bottom', 'left', 'right']}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'android' ? 30 : 0}
        style={{ flex: 1 }}
      >
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
            <Dialog
              visible={visible}
              onDismiss={() => {
                setVisible(false);
                resetForm();
              }}
            >
              <Dialog.Title>Report New Issue</Dialog.Title>
              <Dialog.Content>
                <TextInput
                  label="Title *"
                  value={title}
                  onChangeText={setTitle}
                  mode="outlined"
                  style={styles.dialogInput}
                />
                <TextInput
                  label="Description *"
                  value={description}
                  onChangeText={setDescription}
                  mode="outlined"
                  multiline
                  numberOfLines={3}
                  style={styles.dialogInput}
                />
                <TextInput
                  label="Village ID *"
                  value={villageId}
                  onChangeText={setVillageId}
                  mode="outlined"
                  keyboardType="numeric"
                  style={styles.dialogInput}
                />
                <Text style={styles.label}>Priority</Text>
                <View style={styles.priorityContainer}>
                  {['LOW', 'MEDIUM', 'HIGH'].map(p => (
                    <Chip
                      key={p}
                      selected={priority === p}
                      onPress={() => setPriority(p)}
                      style={styles.priorityChip}
                    >
                      {p}
                    </Chip>
                  ))}
                </View>
              </Dialog.Content>
              <Dialog.Actions>
                <Button
                  onPress={() => {
                    setVisible(false);
                    resetForm();
                  }}
                >
                  Cancel
                </Button>
                <Button onPress={handleCreateIssue}>Submit</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
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
  label: {
    fontSize: 13,
    color: '#666',
    marginBottom: 8,
    marginTop: 8,
  },
  priorityContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: responsiveHeight(2),
  },
  priorityChip: {
    flex: 1,
  },
});

export default IssueListScreen;
