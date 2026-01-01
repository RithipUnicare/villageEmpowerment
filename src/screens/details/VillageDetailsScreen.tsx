import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Title, Text, Card, List, Button, Divider } from 'react-native-paper';
import { responsiveWidth, responsiveHeight } from '../../utils/responsive';

const VillageDetailsScreen = ({ route }: any) => {
  const { village } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.headerCard}>
        <Card.Title
          title={village.name}
          subtitle={`${village.district}, ${village.state}`}
        />
        <Card.Content>
          <Text style={styles.description}>{village.description}</Text>
        </Card.Content>
      </Card>

      <View style={styles.section}>
        <Title style={styles.sectionTitle}>Statistics</Title>
        <Card style={styles.infoCard}>
          <List.Item
            title="Population"
            description={village.population.toLocaleString()}
            left={props => <List.Icon {...props} icon="account-group" />}
          />
          <Divider />
          <List.Item
            title="Primary School"
            description="Available"
            left={props => <List.Icon {...props} icon="school" />}
          />
          <Divider />
          <List.Item
            title="Healthcare Center"
            description="Operational"
            left={props => <List.Icon {...props} icon="hospital-building" />}
          />
        </Card>
      </View>

      <View style={styles.actions}>
        <Button
          mode="contained"
          style={styles.actionButton}
          onPress={() => {
            /* Navigate to facilities */
          }}
        >
          View Facilities
        </Button>
        <Button mode="outlined" style={styles.actionButton}>
          Active Schemes
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F0',
  },
  headerCard: {
    margin: responsiveWidth(4),
    marginTop: responsiveHeight(2),
    elevation: 6,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
  },
  description: {
    lineHeight: 22,
    color: '#444',
    fontSize: 15,
    marginTop: 8,
  },
  section: {
    paddingHorizontal: responsiveWidth(4),
    marginVertical: responsiveHeight(1.5),
  },
  sectionTitle: {
    marginBottom: 12,
    fontSize: 20,
    fontWeight: '600',
  },
  infoCard: {
    backgroundColor: '#fff',
    elevation: 4,
    borderRadius: 12,
  },
  actions: {
    padding: responsiveWidth(4),
    paddingBottom: responsiveHeight(5),
  },
  actionButton: {
    marginBottom: 12,
    borderRadius: 12,
    elevation: 3,
  },
});

export default VillageDetailsScreen;
