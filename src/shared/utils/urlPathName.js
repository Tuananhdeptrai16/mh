import routes from 'src/config/routes.config';
import { isEmpty, isString } from './Typeof';
import {
  SCHOOLS_WAREHOUSE_TYPE,
  TYPE_DATA_MARK_SCHOOL_WAREHOUSE,
} from '../constants/DataFixed';

export const getHistoryPathName = (pathName) => {
  if (isEmpty(pathName)) {
    return '';
  } else {
    if (isString(pathName)) {
      const splitPathName = pathName?.trim()?.split('/')?.filter(Boolean);
      const pathNameOldString = `/${splitPathName[0]}`;
      return pathNameOldString;
    } else {
      return '';
    }
  }
};

export const generateRouteDetailJob = (type, category, idJob) => {
  if (type === TYPE_DATA_MARK_SCHOOL_WAREHOUSE.ATM) {
    switch (category) {
      case SCHOOLS_WAREHOUSE_TYPE.ORGANIZATION:
        return routes.detailJobOrganization(idJob);

      case SCHOOLS_WAREHOUSE_TYPE.E_LEARNING:
        return routes.detailJobELearning(idJob);

      case SCHOOLS_WAREHOUSE_TYPE.DMDC:
        return routes.detailJobDMDC(idJob);

      case SCHOOLS_WAREHOUSE_TYPE.NCKH:
        return routes.detailJobNCKH(idJob);

      case SCHOOLS_WAREHOUSE_TYPE.SUPPORT:
        return routes.detailJobSupport(idJob);

      case SCHOOLS_WAREHOUSE_TYPE.EXAMINATION:
        return routes.detailJobExamination(idJob);

      case SCHOOLS_WAREHOUSE_TYPE.DOCUMENT:
        return routes.detailJobDocument(idJob);

      case SCHOOLS_WAREHOUSE_TYPE.OFFICE:
        return routes.detailJobOffice(idJob);

      default:
        return routes.detailJobOrganization(idJob);
    }
  }
  if (type === TYPE_DATA_MARK_SCHOOL_WAREHOUSE.DTM) {
    switch (category) {
      case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.THDT:
        return routes.detail_data_mark_training(idJob);
      case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.NCKH:
        return routes.detail_data_mark_course_research_status(idJob);

      //Báo cáo động
      case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.REPORT_DYNAMIC:
        return routes.detail_data_mark_report_dynamic(idJob);

      case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.DYNAMIC_QUALITY_ASSURANCE:
        return routes.detail_dynamic_quality_assurance(idJob);

      case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.DYNAMIC_TRAINING_ORGANIZATION:
        return routes.detail_dynamic_training_organization(idJob);

      case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.DYNAMIC_ACADEMY_OPERATIONS:
        return routes.detail_dynamic_academy_operations(idJob);

      case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.DYNAMIC_EXAMINATION_ASSESSMENT:
        return routes.detail_dynamic_examination_assessment(idJob);

      case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.DYNAMIC_GRADUATION_CERTIFICATION:
        return routes.detail_dynamic_graduation_certification(idJob);

      case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.DYNAMIC_STUDENT_PROGRESS:
        return routes.detail_dynamic_student_progress(idJob);

      case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.DYNAMIC_FACULTY_SITUATION:
        return routes.detail_dynamic_faculty_situation(idJob);

      case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.DYNAMIC_ACADEMIC_FINANCE:
        return routes.detail_dynamic_academic_finance(idJob);

      case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.DYNAMIC_SCIENTIFIC_RESEARCH:
        return routes.detail_dynamic_scientific_research(idJob);

      //Báo cáo tĩnh
      case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.ENROLLMENT_STATISTICS:
        return routes.detail_enrollment_statistics(idJob);

      case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.INTERNATIONAL_STUDENTS:
        return routes.detail_international_students(idJob);

      case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.RESEARCH_PARTICIPATION:
        return routes.detail_research_participation(idJob);

      case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.INTERNSHIP_ACTIVITIES:
        return routes.detail_internship_activities(idJob);

      case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.CREDIT_TRANSFER:
        return routes.detail_credit_transfer(idJob);

      case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.EXAM_EXEMPTION:
        return routes.detail_exam_exemption(idJob);

      case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.AWARDS_SITUATION:
        return routes.detail_awards_situation(idJob);

      case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.DISCIPLINARY_ACTIONS:
        return routes.detail_disciplinary_actions(idJob);

      case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.SCHOLARSHIP_RECIPIENTS:
        return routes.detail_scholarship_recipients(idJob);

      case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.SUPPORT_ASSISTANCE:
        return routes.detail_support_assistance(idJob);

      case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.FEE_WAIVERS:
        return routes.detail_fee_waivers(idJob);

      case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.GRADE_DEFICIENCY:
        return routes.detail_grade_deficiency(idJob);

      case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.STUDENT_QUALITY:
        return routes.detail_student_quality(idJob);

      case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.ACADEMIC_RANKING:
        return routes.detail_academic_ranking(idJob);

      case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.PERFORMANCE_RANKING:
        return routes.detail_performance_ranking(idJob);

      case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.HONOR_TITLES:
        return routes.detail_honor_titles(idJob);

      case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.MEAN_DEVIATION:
        return routes.detail_mean_deviation(idJob);

      case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.GRADE_DISTRIBUTION:
        return routes.detail_grade_distribution(idJob);

      case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.STUDY_PROGRESS:
        return routes.detail_study_progress(idJob);

      case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.MAKEUP_EXAMS:
        return routes.detail_makeup_exams(idJob);

      case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.COURSE_EVALUATION:
        return routes.detail_course_evaluation(idJob);

      case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.EXAM_RECHECK:
        return routes.detail_exam_recheck(idJob);

      case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.EXAM_COMPLAINTS:
        return routes.detail_exam_complaints(idJob);

      case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.GRADUATION_NUMBERS:
        return routes.detail_graduation_numbers(idJob);

      case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.GRADUATION_STATUS:
        return routes.detail_graduation_status(idJob);

      case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.CREDENTIAL_ISSUANCE:
        return routes.detail_credential_issuance(idJob);

      case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.RESEARCH_TOPICS:
        return routes.detail_research_topics(idJob);

      case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.STAFF_NUMBERS:
        return routes.detail_staff_numbers(idJob);

      case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.BOOK_COUNT:
        return routes.detail_book_count(idJob);

      case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.AUTHOR_STAFF:
        return routes.detail_author_staff(idJob);

      case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.STAFF_ARTICLES:
        return routes.detail_staff_articles(idJob);

      case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.JOURNAL_ARTICLES:
        return routes.detail_journal_articles(idJob);

      case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.CONFERENCE_REPORTS:
        return routes.detail_conference_reports(idJob);

      case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.PATENTS_COUNT:
        return routes.detail_patents_count(idJob);

      case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.STUDENT_RESEARCHER:
        return routes.detail_student_researcher(idJob);

      case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.RESEARCH_ACHIEVEMENTS:
        return routes.detail_research_achievements(idJob);

      case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.PROJECT_OUTCOMES:
        return routes.detail_project_outcomes(idJob);

      case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.CONTRACT_LIST:
        return routes.detail_contract_list(idJob);

      case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.PUBLICATION_RESULTS:
        return routes.detail_publication_results(idJob);

      case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.SCIENCE_STAFF:
        return routes.detail_science_staff(idJob);

      case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.SCIENCE_FUNDING:
        return routes.detail_science_funding(idJob);

      case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.TECH_DEVELOPMENT:
        return routes.detail_tech_development(idJob);

      case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.INTERNATIONAL_COOPERATION:
        return routes.detail_international_cooperation(idJob);

      case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.RESEARCH_REVENUE:
        return routes.detail_research_revenue(idJob);

      case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.PERFORM_WORK:
        return routes.detail_perform_work(idJob);

      default:
        return routes.detail_report_static_job(idJob);
    }
  }
};

export const generateRouteAddJob = (category) => {
  switch (category) {
    case SCHOOLS_WAREHOUSE_TYPE.ORGANIZATION:
      return routes.addJobOrganization;

    case SCHOOLS_WAREHOUSE_TYPE.E_LEARNING:
      return routes.addJobELearning;

    case SCHOOLS_WAREHOUSE_TYPE.DMDC:
      return routes.addJobDMDC;

    case SCHOOLS_WAREHOUSE_TYPE.NCKH:
      return routes.addJobNCKH;

    case SCHOOLS_WAREHOUSE_TYPE.SUPPORT:
      return routes.addJobSupport;

    case SCHOOLS_WAREHOUSE_TYPE.EXAMINATION:
      return routes.addJobExamination;

    case SCHOOLS_WAREHOUSE_TYPE.DOCUMENT:
      return routes.addJobDocument;

    case SCHOOLS_WAREHOUSE_TYPE.OFFICE:
      return routes.addJobOffice;

    default:
      return routes.addJobOrganization;
  }
};

export const generateRouteAddDataMark = (category) => {
  switch (category) {
    case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.THDT:
      return routes.aggregate_data_mark_training_add;

    case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.NCKH:
      return routes.aggregate_data_mark_course_research_status_add;

    //Báo cáo động
    case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.REPORT_DYNAMIC:
      return routes.summary_dynamic_report_add_job;

    case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.DYNAMIC_QUALITY_ASSURANCE:
      return routes.dynamic_quality_assurance_add_job;

    case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.DYNAMIC_TRAINING_ORGANIZATION:
      return routes.dynamic_training_organization_add_job;

    case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.DYNAMIC_ACADEMY_OPERATIONS:
      return routes.dynamic_academy_operations_add_job;

    case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.DYNAMIC_EXAMINATION_ASSESSMENT:
      return routes.dynamic_examination_assessment_add_job;

    case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.DYNAMIC_GRADUATION_CERTIFICATION:
      return routes.dynamic_graduation_certification_add_job;

    case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.DYNAMIC_STUDENT_PROGRESS:
      return routes.dynamic_student_progress_add_job;

    case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.DYNAMIC_FACULTY_SITUATION:
      return routes.dynamic_faculty_situation_add_job;

    case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.DYNAMIC_ACADEMIC_FINANCE:
      return routes.dynamic_academic_finance_add_job;

    case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.DYNAMIC_SCIENTIFIC_RESEARCH:
      return routes.dynamic_scientific_research_add_job;

    //Báo cáo tĩnh
    case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.ENROLLMENT_STATISTICS:
      return routes.enrollment_statistics_add_job;

    case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.INTERNATIONAL_STUDENTS:
      return routes.international_students_add_job;

    case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.RESEARCH_PARTICIPATION:
      return routes.research_participation_add_job;

    case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.INTERNSHIP_ACTIVITIES:
      return routes.internship_activities_add_job;

    case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.CREDIT_TRANSFER:
      return routes.credit_transfer_add_job;

    case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.EXAM_EXEMPTION:
      return routes.exam_exemption_add_job;

    case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.AWARDS_SITUATION:
      return routes.awards_situation_add_job;

    case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.DISCIPLINARY_ACTIONS:
      return routes.disciplinary_actions_add_job;

    case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.SCHOLARSHIP_RECIPIENTS:
      return routes.scholarship_recipients_add_job;

    case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.SUPPORT_ASSISTANCE:
      return routes.support_assistance_add_job;

    case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.FEE_WAIVERS:
      return routes.fee_waivers_add_job;

    case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.GRADE_DEFICIENCY:
      return routes.grade_deficiency_add_job;

    case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.STUDENT_QUALITY:
      return routes.student_quality_add_job;

    case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.ACADEMIC_RANKING:
      return routes.academic_ranking_add_job;

    case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.PERFORMANCE_RANKING:
      return routes.performance_ranking_add_job;

    case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.HONOR_TITLES:
      return routes.honor_titles_add_job;

    case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.MEAN_DEVIATION:
      return routes.mean_deviation_add_job;

    case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.GRADE_DISTRIBUTION:
      return routes.grade_distribution_add_job;

    case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.STUDY_PROGRESS:
      return routes.study_progress_add_job;

    case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.MAKEUP_EXAMS:
      return routes.makeup_exams_add_job;

    case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.COURSE_EVALUATION:
      return routes.course_evaluation_add_job;

    case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.EXAM_RECHECK:
      return routes.exam_recheck_add_job;

    case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.EXAM_COMPLAINTS:
      return routes.exam_complaints_add_job;

    case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.GRADUATION_NUMBERS:
      return routes.graduation_numbers_add_job;

    case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.GRADUATION_STATUS:
      return routes.graduation_status_add_job;

    case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.CREDENTIAL_ISSUANCE:
      return routes.credential_issuance_add_job;

    case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.RESEARCH_TOPICS:
      return routes.research_topics_add_job;

    case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.STAFF_NUMBERS:
      return routes.staff_numbers_add_job;

    case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.BOOK_COUNT:
      return routes.book_count_add_job;

    case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.AUTHOR_STAFF:
      return routes.author_staff_add_job;

    case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.STAFF_ARTICLES:
      return routes.staff_articles_add_job;

    case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.JOURNAL_ARTICLES:
      return routes.journal_articles_add_job;

    case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.CONFERENCE_REPORTS:
      return routes.conference_reports_add_job;

    case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.PATENTS_COUNT:
      return routes.patents_count_add_job;

    case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.STUDENT_RESEARCHER:
      return routes.student_researcher_add_job;

    case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.RESEARCH_ACHIEVEMENTS:
      return routes.research_achievements_add_job;

    case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.PROJECT_OUTCOMES:
      return routes.project_outcomes_add_job;

    case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.CONTRACT_LIST:
      return routes.contract_list_add_job;

    case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.PUBLICATION_RESULTS:
      return routes.publication_results_add_job;

    case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.SCIENCE_STAFF:
      return routes.science_staff_add_job;

    case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.SCIENCE_FUNDING:
      return routes.science_funding_add_job;

    case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.TECH_DEVELOPMENT:
      return routes.tech_development_add_job;

    case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.INTERNATIONAL_COOPERATION:
      return routes.international_cooperation_add_job;

    case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.RESEARCH_REVENUE:
      return routes.research_revenue_add_job;

    case TYPE_DATA_MARK_SCHOOL_WAREHOUSE.PERFORM_WORK:
      return routes.perform_work_add_job;

    default:
      return routes.report_static_job;
  }
};
