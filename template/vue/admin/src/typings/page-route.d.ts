declare namespace PageRoute {
  /**
   * the root route key
   * @translate 根路由
   */
  type RootRouteKey = 'root';

  /**
   * the not found route, which catch the invalid route path
   * @translate 未找到路由(捕获无效路径的路由)
   */
  type NotFoundRouteKey = 'not-found';

  /**
   * the route key
   * @translate 页面路由
   */
  type RouteKey =
    | '403'
    | '404'
    | '500'
    | 'constant-page'
    | 'login'
    | 'not-found'
    | 'device-management'
    | 'device-management_error-record'
    | 'device-management_management'
    | 'device-management_resource-manage'
    | 'device-management_type'
    | 'map-picture'
    | 'patrol'
    | 'patrol_everyday'
    | 'patrol_image-display'
    | 'patrol_image-management'
    | 'patrol_monitor-results'
    | 'patrol_patrol-set'
    | 'patrol_report-management'
    | 'patrol_special-project'
    | 'patrol_statistics'
    | 'project-management'
    | 'project-management_build-management'
    | 'project-management_data-management'
    | 'project-management_environment-data'
    | 'project-management_project-management'
    | 'project-management_record-management'
    | 'project-management_safety-process'
    | 'project-management_station-management'
    | 'repair-maintenance'
    | 'repair-maintenance_dam-safety'
    | 'repair-maintenance_defect-treatment'
    | 'repair-maintenance_everyday-maintenance'
    | 'repair-maintenance_funds-management'
    | 'repair-maintenance_plan-management'
    | 'security-monitoring'
    | 'security-monitoring_comprehensive-monitor'
    | 'security-monitoring_forecast-record'
    | 'security-monitoring_integration-analysis'
    | 'security-monitoring_manual-observe'
    | 'security-monitoring_model-factor'
    | 'security-monitoring_model-library'
    | 'security-monitoring_monitor-report'
    | 'security-monitoring_predicted-results'
    | 'security-monitoring_prediction-model'
    | 'security-monitoring_safe-warning'
    | 'system-management'
    | 'system-management_app-manage'
    | 'system-management_apply-manage'
    | 'system-management_config-manage'
    | 'system-management_config-manage_config-cate'
    | 'system-management_config-manage_config-list'
    | 'system-management_log-manage'
    | 'system-management_log-manage_login-log'
    | 'system-management_log-manage_operate-log'
    | 'system-management_message-manage'
    | 'system-management_message-manage_message-list'
    | 'system-management_message-manage_message-source'
    | 'system-management_notice-manage'
    | 'system-management_organ-manage'
    | 'system-management_personal-information'
    | 'system-management_position-manage'
    | 'system-management_region-manage'
    | 'system-management_role-manage'
    | 'system-management_tenant-manage'
    | 'system-management_user-book'
    | 'system-management_user-manage'
    | 'video-management'
    | 'video-management_video-device'
    | 'video-management_video-monitor';

  /**
   * last degree route key, which has the page file
   * @translate 最后一级路由(该级路有对应的页面文件)
   */
  type LastDegreeRouteKey = Extract<
    RouteKey,
    | '403'
    | '404'
    | '500'
    | 'constant-page'
    | 'login'
    | 'not-found'
    | 'device-management_error-record'
    | 'device-management_management'
    | 'device-management_resource-manage'
    | 'device-management_type'
    | 'map-picture'
    | 'patrol_everyday'
    | 'patrol_image-display'
    | 'patrol_image-management'
    | 'patrol_monitor-results'
    | 'patrol_patrol-set'
    | 'patrol_report-management'
    | 'patrol_special-project'
    | 'patrol_statistics'
    | 'project-management_build-management'
    | 'project-management_data-management'
    | 'project-management_environment-data'
    | 'project-management_project-management'
    | 'project-management_record-management'
    | 'project-management_safety-process'
    | 'project-management_station-management'
    | 'repair-maintenance_dam-safety'
    | 'repair-maintenance_defect-treatment'
    | 'repair-maintenance_everyday-maintenance'
    | 'repair-maintenance_funds-management'
    | 'repair-maintenance_plan-management'
    | 'security-monitoring_comprehensive-monitor'
    | 'security-monitoring_forecast-record'
    | 'security-monitoring_integration-analysis'
    | 'security-monitoring_manual-observe'
    | 'security-monitoring_model-factor'
    | 'security-monitoring_model-library'
    | 'security-monitoring_monitor-report'
    | 'security-monitoring_predicted-results'
    | 'security-monitoring_prediction-model'
    | 'security-monitoring_safe-warning'
    | 'system-management_app-manage'
    | 'system-management_apply-manage'
    | 'system-management_config-manage_config-cate'
    | 'system-management_config-manage_config-list'
    | 'system-management_log-manage_login-log'
    | 'system-management_log-manage_operate-log'
    | 'system-management_message-manage_message-list'
    | 'system-management_message-manage_message-source'
    | 'system-management_notice-manage'
    | 'system-management_organ-manage'
    | 'system-management_personal-information'
    | 'system-management_position-manage'
    | 'system-management_region-manage'
    | 'system-management_role-manage'
    | 'system-management_tenant-manage'
    | 'system-management_user-book'
    | 'system-management_user-manage'
    | 'video-management_video-device'
    | 'video-management_video-monitor'
  >;
}
