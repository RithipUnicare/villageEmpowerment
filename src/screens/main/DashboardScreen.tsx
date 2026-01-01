import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Text,
  Title,
  Card,
  IconButton,
  Avatar,
  Paragraph,
} from 'react-native-paper';
import { responsiveWidth, responsiveHeight } from '../../utils/responsive';
import { DashboardService } from '../../services/DashboardService';
import { DashboardStats } from '../../types';

const DashboardScreen = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await DashboardService.getAdminStats();
      setStats(res.data);
    } catch (e) {
      console.error(e);
      // Fallback to dummy data if API fails
      setStats({
        totalVillages: 12,
        totalIssues: 45,
        resolvedIssues: 30,
        pendingIssues: 15,
        activeSchemes: 8,
      });
    }
  };

  const StatCard = ({ title, count, icon, color }: any) => (
    <Card
      style={[styles.statCard, { borderLeftColor: color, borderLeftWidth: 5 }]}
    >
      <Card.Content style={styles.statContent}>
        <View>
          <Text style={styles.statLabel}>{title}</Text>
          <Title style={styles.statValue}>{count}</Title>
        </View>
        <Avatar.Icon
          size={40}
          icon={icon}
          theme={{ colors: { primary: color } }}
        />
      </Card.Content>
    </Card>
  );

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['bottom', 'left', 'right']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'android' ? 30 : 0}
        style={{ flex: 1 }}
      >
        <ScrollView style={styles.container}>
          <View style={styles.header}>
            <Title style={styles.welcomeText}>Hello, Admin!</Title>
            <Text style={styles.subWelcomeText}>
              Here is your village overview
            </Text>
          </View>

          <View style={styles.statsGrid}>
            <StatCard
              title="Total Villages"
              count={stats?.totalVillages}
              icon="home-city"
              color="#2E7D32"
            />
            <StatCard
              title="Total Issues"
              count={stats?.totalIssues}
              icon="alert-circle"
              color="#E53935"
            />
            <StatCard
              title="Resolved"
              count={stats?.resolvedIssues}
              icon="check-circle"
              color="#43A047"
            />
            <StatCard
              title="Active Schemes"
              count={stats?.activeSchemes}
              icon="file-document"
              color="#FFB300"
            />
          </View>

          <Title style={styles.sectionTitle}>Recent Announcements</Title>
          {/* List would go here */}
          <Card style={styles.announcementCard}>
            <Card.Title
              title="New Health Policy"
              subtitle="Effective from Jan 2026"
              left={props => <Avatar.Icon {...props} icon="information" />}
            />
            <Card.Content>
              <Text>
                The government has introduced a new primary healthcare scheme
                for rural areas.
              </Text>
            </Card.Content>
          </Card>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F0',
  },
  header: {
    padding: responsiveWidth(6),
    paddingTop: responsiveHeight(6),
    backgroundColor: '#2E7D32',
    height: responsiveHeight(22),
    justifyContent: 'center',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  welcomeText: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  subWelcomeText: {
    color: '#E8F5E9',
    fontSize: 15,
    marginTop: 4,
    fontWeight: '400',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: responsiveWidth(4),
    marginTop: -responsiveHeight(6),
    justifyContent: 'space-between',
  },
  statCard: {
    width: responsiveWidth(44),
    marginBottom: responsiveHeight(2),
    backgroundColor: '#FFFFFF',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    borderRadius: 16,
  },
  statContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 4,
  },
  statLabel: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  sectionTitle: {
    paddingHorizontal: responsiveWidth(5),
    marginTop: responsiveHeight(2),
    marginBottom: responsiveHeight(1.5),
    fontSize: 20,
    fontWeight: '600',
  },
  announcementCard: {
    marginHorizontal: responsiveWidth(5),
    marginBottom: responsiveHeight(3),
    elevation: 4,
    borderRadius: 12,
  },
});

export default DashboardScreen;
