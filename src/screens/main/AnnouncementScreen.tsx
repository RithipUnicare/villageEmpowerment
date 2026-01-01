import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native';
import {
  Card,
  Title,
  Paragraph,
  FAB,
  Portal,
  Dialog,
  Button,
  TextInput,
  Avatar,
  IconButton,
} from 'react-native-paper';
import { responsiveWidth, responsiveHeight } from '../../utils/responsive';
import {
  AnnouncementService,
  Announcement,
} from '../../services/AnnouncementService';

const AnnouncementScreen = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    setLoading(true);
    try {
      const res = await AnnouncementService.getAll();
      setAnnouncements(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAnnouncement = async () => {
    if (!title || !content) {
      return;
    }

    try {
      await AnnouncementService.create({ title, content });
      setVisible(false);
      resetForm();
      fetchAnnouncements();
    } catch (error) {
      console.error('Error creating announcement:', error);
    }
  };

  const handleDeleteAnnouncement = async (id: number) => {
    try {
      await AnnouncementService.delete(id);
      fetchAnnouncements();
    } catch (error) {
      console.error('Error deleting announcement:', error);
    }
  };

  const resetForm = () => {
    setTitle('');
    setContent('');
  };

  const renderAnnouncement = ({ item }: { item: Announcement }) => (
    <Card style={styles.card}>
      <Card.Title
        title={item.title}
        subtitle={`By ${item.createdBy} • ${new Date(
          item.createdAt,
        ).toLocaleDateString()}`}
        left={props => (
          <Avatar.Icon
            {...props}
            icon="bullhorn"
            theme={{ colors: { primary: '#FFB300' } }}
          />
        )}
        right={props => (
          <IconButton
            {...props}
            icon="delete"
            onPress={() => handleDeleteAnnouncement(item.id)}
          />
        )}
      />
      <Card.Content>
        <Paragraph>{item.content}</Paragraph>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={announcements}
        renderItem={renderAnnouncement}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={fetchAnnouncements} />
        }
      />

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => setVisible(true)}
        label="New Announcement"
      />

      <Portal>
        <Dialog
          visible={visible}
          onDismiss={() => {
            setVisible(false);
            resetForm();
          }}
        >
          <Dialog.Title>Create Announcement</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Title *"
              value={title}
              onChangeText={setTitle}
              mode="outlined"
              style={styles.dialogInput}
            />
            <TextInput
              label="Content *"
              value={content}
              onChangeText={setContent}
              mode="outlined"
              multiline
              numberOfLines={4}
              style={styles.dialogInput}
            />
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
            <Button onPress={handleCreateAnnouncement}>Create</Button>
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
  fab: {
    position: 'absolute',
    margin: 20,
    right: 0,
    bottom: 0,
    backgroundColor: '#FFB300',
    elevation: 8,
  },
  dialogInput: {
    marginBottom: responsiveHeight(2),
    backgroundColor: '#FAFAFA',
  },
});

export default AnnouncementScreen;
