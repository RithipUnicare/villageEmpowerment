import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
  Platform,
  KeyboardAvoidingView,
  Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Card,
  Title,
  Paragraph,
  Chip,
  List,
  FAB,
  Portal,
  Dialog,
  Button,
  TextInput,
  IconButton,
} from 'react-native-paper';
import { responsiveWidth, responsiveHeight } from '../../utils/responsive';
import { SchemeService } from '../../services/SchemeService';
import { Scheme } from '../../types';
import { useUser } from '../../context/UserContext';

const SchemeScreen = () => {
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [benefits, setBenefits] = useState('');
  const [eligibility, setEligibility] = useState('');
  const { isSuperAdmin } = useUser();

  useEffect(() => {
    fetchSchemes();
  }, []);

  const fetchSchemes = async () => {
    setLoading(true);
    try {
      const res = await SchemeService.getActive();
      setSchemes(res.data);
    } catch (e) {
      console.error(e);
      // Fallback to dummy data if API fails
      setSchemes([
        {
          id: 1,
          title: 'PM-KISAN Scheme',
          description: 'Direct income support to farmers',
          category: 'Agriculture',
          benefits: '₹6000 per year in three installments',
          eligibility: 'All landholding farmers',
          isActive: true,
        },
        {
          id: 2,
          title: 'MGNREGA',
          description: 'Employment guarantee scheme',
          category: 'Employment',
          benefits: 'Guaranteed 100 days of wage employment',
          eligibility: 'Rural households willing to do manual labor',
          isActive: true,
        },
        {
          id: 3,
          title: 'Ayushman Bharat',
          description: 'Health insurance for poor families',
          category: 'Healthcare',
          benefits: 'Health cover of ₹5 lakhs per family per year',
          eligibility: 'Poor and vulnerable families',
          isActive: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateScheme = async () => {
    if (!title || !description || !category) {
      return;
    }

    try {
      await SchemeService.create({
        title,
        description,
        category,
        benefits,
        eligibility,
      });
      setVisible(false);
      resetForm();
      fetchSchemes();
    } catch (error) {
      console.error('Error creating scheme:', error);
    }
  };

  const handleDeleteScheme = async (id: number) => {
    try {
      await SchemeService.delete(id);
      fetchSchemes();
    } catch (error) {
      console.error('Error deleting scheme:', error);
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setCategory('');
    setBenefits('');
    setEligibility('');
  };

  const renderScheme = ({ item }: { item: Scheme }) => (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.header}>
          <Title style={styles.title}>{item.title}</Title>
          {isSuperAdmin && (
            <IconButton
              icon="delete"
              size={20}
              onPress={() => handleDeleteScheme(item.id)}
            />
          )}
        </View>
        <Chip style={styles.categoryChip} textStyle={{ color: '#fff' }}>
          {item.category}
        </Chip>
        <Paragraph style={styles.description}>{item.description}</Paragraph>
        <List.Item
          title="Benefits"
          description={item.benefits}
          left={props => <List.Icon {...props} icon="gift" />}
          titleStyle={{ fontWeight: '600' }}
        />
        <List.Item
          title="Eligibility"
          description={item.eligibility}
          left={props => <List.Icon {...props} icon="account-check" />}
          titleStyle={{ fontWeight: '600' }}
        />
      </Card.Content>
    </Card>
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
            data={schemes}
            renderItem={renderScheme}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={styles.listContent}
            refreshControl={
              <RefreshControl refreshing={loading} onRefresh={fetchSchemes} />
            }
          />

          {isSuperAdmin && (
            <FAB
              icon="plus"
              style={styles.fab}
              onPress={() => setVisible(true)}
              label="Add Scheme"
            />
          )}

          <Portal>
            <Dialog
              visible={visible}
              onDismiss={() => {
                setVisible(false);
                resetForm();
              }}
            >
              <Dialog.Title>Add New Scheme</Dialog.Title>
              <Dialog.Content>
                <TextInput
                  label="Title *"
                  value={title}
                  onChangeText={setTitle}
                  mode="outlined"
                  style={styles.dialogInput}
                />
                <TextInput
                  label="Category *"
                  value={category}
                  onChangeText={setCategory}
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
                  label="Benefits"
                  value={benefits}
                  onChangeText={setBenefits}
                  mode="outlined"
                  multiline
                  numberOfLines={2}
                  style={styles.dialogInput}
                />
                <TextInput
                  label="Eligibility"
                  value={eligibility}
                  onChangeText={setEligibility}
                  mode="outlined"
                  multiline
                  numberOfLines={2}
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
                <Button onPress={handleCreateScheme}>Add</Button>
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
    paddingBottom: responsiveHeight(3),
  },
  card: {
    marginBottom: responsiveHeight(2.5),
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
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
    color: '#1A1A1A',
  },
  categoryChip: {
    alignSelf: 'flex-start',
    backgroundColor: '#2E7D32',
    marginVertical: 8,
  },
  dialogInput: {
    marginBottom: responsiveHeight(2),
    backgroundColor: '#FAFAFA',
  },
  fab: {
    position: 'absolute',
    margin: 20,
    right: 0,
    bottom: 0,
    backgroundColor: '#2E7D32',
    elevation: 8,
  },
  activeChip: {
    backgroundColor: '#43A047',
    height: 28,
  },
  description: {
    color: '#666',
    marginBottom: 12,
    lineHeight: 20,
  },
  section: {
    marginTop: 8,
  },
  listTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2E7D32',
  },
});

export default SchemeScreen;
