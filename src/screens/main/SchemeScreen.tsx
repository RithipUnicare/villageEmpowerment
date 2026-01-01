import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { Card, Title, Paragraph, Chip, List } from 'react-native-paper';
import { responsiveWidth, responsiveHeight } from '../../utils/responsive';
import { SchemeService } from '../../services/SchemeService';
import { Scheme } from '../../types';

const SchemeScreen = () => {
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSchemes();
  }, []);

  const fetchSchemes = async () => {
    setLoading(true);
    try {
      // const res = await SchemeService.getActive();
      // setSchemes(res.data);
      // Dummy data
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
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const renderScheme = ({ item }: { item: Scheme }) => (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.header}>
          <Title style={styles.title}>{item.title}</Title>
          {item.isActive && (
            <Chip
              style={styles.activeChip}
              textStyle={{ color: '#fff', fontSize: 11 }}
            >
              Active
            </Chip>
          )}
        </View>
        <Paragraph style={styles.description}>{item.description}</Paragraph>

        <List.Section style={styles.section}>
          <List.Item
            title="Category"
            description={item.category}
            left={props => <List.Icon {...props} icon="tag" />}
            titleStyle={styles.listTitle}
          />
          <List.Item
            title="Benefits"
            description={item.benefits}
            left={props => <List.Icon {...props} icon="gift" />}
            titleStyle={styles.listTitle}
          />
          <List.Item
            title="Eligibility"
            description={item.eligibility}
            left={props => <List.Icon {...props} icon="account-check" />}
            titleStyle={styles.listTitle}
          />
        </List.Section>
      </Card.Content>
    </Card>
  );

  return (
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
