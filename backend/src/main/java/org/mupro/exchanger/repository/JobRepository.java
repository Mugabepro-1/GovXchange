package org.mupro.exchanger.repository;

import org.mupro.exchanger.model.Job;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobRepository extends JpaRepository<Job, Long> {
}
